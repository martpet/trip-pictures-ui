import '~/assets/css/index.css';

import { Intl, Layout, Routes, Spectrum } from '~/components';
import { useAppHooks } from '~/hooks';

export function App() {
  useAppHooks();

  return (
    <Spectrum>
      <Intl>
        <Layout>
          <Routes />
        </Layout>
      </Intl>
    </Spectrum>
  );
}
