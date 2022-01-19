import { ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { useIntl } from 'react-intl';

import { UploadDialog } from '~/components/Upload';

export function UploadDialogTrigger() {
  const { formatMessage } = useIntl();

  return (
    <DialogTrigger isDismissable>
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.upload' })}>
        <UploadIcon />
      </ActionButton>
      <UploadDialog />
    </DialogTrigger>
  );
}
