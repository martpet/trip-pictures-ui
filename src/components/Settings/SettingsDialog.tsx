import { Content, Dialog } from '@adobe/react-spectrum';
import { lazy, Suspense } from 'react';

import { Spinner } from '~/components';

const Settings = lazy(() => import('~/components/Settings'));

export function SettingsDialog() {
  return (
    <Dialog size="L">
      <Content>
        <Suspense fallback={<Spinner />}>
          <Settings />
        </Suspense>
      </Content>
    </Dialog>
  );
}
