import { ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { lazy, Suspense } from 'react';
import { useIntl } from 'react-intl';

const UploadDialog = lazy(() => import('~/components/Upload'));

export function UploadButton() {
  const { formatMessage } = useIntl();

  return (
    <DialogTrigger type="fullscreen">
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.upload' })}>
        <UploadIcon />
      </ActionButton>
      {(close) => (
        <Suspense fallback={null}>
          <UploadDialog close={close} />
        </Suspense>
      )}
    </DialogTrigger>
  );
}
