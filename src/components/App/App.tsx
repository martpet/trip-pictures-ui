import '~/assets/css/index.css';

import { Intl, Layout, Router, Spectrum, UploadProvider } from '~/components';
import { useAppHooks } from '~/hooks';

export function App() {
  useAppHooks();

  return (
    <Spectrum>
      <Intl>
        <UploadProvider>
          <Layout>
            <Router />
          </Layout>
        </UploadProvider>
      </Intl>
    </Spectrum>
  );
}
