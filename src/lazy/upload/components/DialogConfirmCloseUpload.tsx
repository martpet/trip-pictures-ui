import { AlertDialog, DialogContainer } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { UploadContext } from '~/lazy/upload';

export function DialogConfirmCloseUpload() {
  const { showConfirmClose, setShowConfirmClose, closeDialog } =
    useContext(UploadContext);
  const { formatMessage } = useIntl();

  const handleConfirm = () => closeDialog(true);
  const handleDismiss = () => setShowConfirmClose(false);

  return (
    <DialogContainer onDismiss={handleDismiss}>
      {showConfirmClose && (
        <AlertDialog
          variant="destructive"
          title={formatMessage({ id: 'upload.confirmCancel.title' })}
          primaryActionLabel={formatMessage({
            id: 'upload.confirmCancel.primaryActionLabel',
          })}
          cancelLabel={formatMessage({ id: 'upload.confirmCancel.cancelLabel' })}
          autoFocusButton="cancel"
          onPrimaryAction={handleConfirm}
        >
          <FormattedMessage id="upload.confirmCancel.content" />
        </AlertDialog>
      )}
    </DialogContainer>
  );
}
