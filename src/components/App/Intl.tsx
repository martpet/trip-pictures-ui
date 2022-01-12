import { ReactNode, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import { LoadingOverlay } from '~/components';
import { useGetTranslationsQuery } from '~/services';
import { selectLang } from '~/slices';
import { toastDev } from '~/utils';

type IntlProps = {
  children: ReactNode;
};

export function Intl({ children }: IntlProps) {
  const lang = useSelector(selectLang);
  const { data } = useGetTranslationsQuery(lang);
  const hasData = data && Object.keys(data).length;

  const handleError = ({ message }: Error) => {
    toastDev(message, { id: message });
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <IntlProvider locale={lang} messages={data} onError={handleError}>
      {hasData ? children : <LoadingOverlay />}
    </IntlProvider>
  );
}
