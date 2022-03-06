import { Layout, Router } from '~/components';
import { siteTitle } from '~/consts';
import {
  useGetCurrentUser,
  useHandleDeviceColorMode,
  usePageTitle,
  usePreventDragDrop,
  useSyncSettings,
} from '~/hooks';

export function App() {
  useGetCurrentUser();
  useSyncSettings();
  useHandleDeviceColorMode();
  usePreventDragDrop();
  usePageTitle(siteTitle);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}
