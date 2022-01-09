import { generatePath } from 'react-router-dom';

import { servicesUrls, strapiApiPaths } from '~/consts';
import { useLazySendOAuthTokenQuery } from '~/services';
import { OAuthProvider } from '~/types';

export const useLoginWithProvider = () => {
  const [passToken] = useLazySendOAuthTokenQuery();

  const handleProviderResponse = ({ source, data }: MessageEvent) => {
    passToken(data);
    (source as WindowProxy).close();
  };

  return (provider: OAuthProvider) => {
    const connectPath = generatePath(strapiApiPaths.oauthConnect, { provider });
    const connectUrl = `${servicesUrls.strapiApi}/${connectPath}`;
    const windowName = 'authRedirectPopup';
    const windowWidth = 600;
    const windowPositionLeft = window.screen.width / 2 - windowWidth / 2;
    const windowFeatures = `toolbar=no, menubar=no, width=${windowWidth}, height=650, top=100, left=${windowPositionLeft}`;

    window.open(connectUrl, windowName, windowFeatures);
    window.addEventListener('message', handleProviderResponse);
  };
};
