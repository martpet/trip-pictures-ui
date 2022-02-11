import { siteTitle } from '~/consts';
import {
  useDeviceColorMode,
  usePageTitle,
  usePreventDragDrop,
  useSyncSettings,
  useWillFetchUser,
} from '~/hooks';
import { useGetMeQuery } from '~/services';

export const useAppHooks = () => {
  const willFetchUser = useWillFetchUser();

  useGetMeQuery(undefined, { skip: !willFetchUser });
  useSyncSettings();
  useDeviceColorMode();
  usePageTitle(siteTitle);
  usePreventDragDrop();
};
