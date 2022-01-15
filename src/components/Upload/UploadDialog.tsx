import { Content, Dialog, Divider, Heading } from '@adobe/react-spectrum';
import { lazy, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';

import { Spinner } from '~/components';

const Upload = lazy(() => import('~/components/Upload'));

export function UploadDialog() {
  return (
    <Dialog size="L">
      <Heading>
        <FormattedMessage id="dialog.upload.heading" />
      </Heading>
      <Divider />
      <Content>
        <Suspense fallback={<Spinner />}>
          <Upload />
        </Suspense>
      </Content>
    </Dialog>
  );
}
