import '~/assets/css/index.css';

import { Intl, Layout, Router, Spectrum } from '~/components';
import { useAppHooks } from '~/hooks';

export function App() {
  useAppHooks();

  return (
    <Spectrum>
      <Intl>
        <Layout>
          <Router />
        </Layout>
      </Intl>
    </Spectrum>
  );
}
