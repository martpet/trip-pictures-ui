import { ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { useIntl } from 'react-intl';

import { UploadDialog, UploadProvider } from '~/components/Upload';

export function UploadDialogTrigger() {
  const { formatMessage } = useIntl();

  return (
    <UploadProvider>
      <DialogTrigger type="fullscreen">
        <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.upload' })}>
          <UploadIcon />
        </ActionButton>
        {(close) => <UploadDialog close={close} />}
      </DialogTrigger>
    </UploadProvider>
  );
}
