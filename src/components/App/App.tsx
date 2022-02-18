import { Layout, Router } from '~/components';
import { siteTitle } from '~/consts';
import {
  useDeviceColorMode,
  usePageTitle,
  usePreventDragDrop,
  useSyncSettings,
  useWillFetchUser,
} from '~/hooks';
import { useGetMeQuery } from '~/services';

export function App() {
  const fetchUserPending = useWillFetchUser();

  useGetMeQuery(undefined, { skip: !fetchUserPending });
  useSyncSettings();
  useDeviceColorMode();
  usePreventDragDrop();
  usePageTitle(siteTitle);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}
