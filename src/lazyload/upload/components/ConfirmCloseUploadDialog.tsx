import { AlertDialog, DialogContainer } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { UploadContext } from '~/lazyload/upload';

export function ConfirmCloseUploadDialog() {
  const {
    isConfirmCloseUploadDialogOpen,
    setConfirmCloseUploadDialogOpen,
    closeUploadDialog,
  } = useContext(UploadContext);
  const { formatMessage } = useIntl();

  const handleConfirm = () => closeUploadDialog(true);
  const handleDismiss = () => setConfirmCloseUploadDialogOpen(false);

  return (
    <DialogContainer onDismiss={handleDismiss}>
      {isConfirmCloseUploadDialogOpen && (
        <AlertDialog
          variant="confirmation"
          title={formatMessage({ id: 'upload.confirmCloseUploadDialog.title' })}
          primaryActionLabel={formatMessage({
            id: 'upload.confirmCloseUploadDialog.primaryAction',
          })}
          cancelLabel={formatMessage({
            id: 'upload.confirmCloseUploadDialog.cancelLabel',
          })}
          autoFocusButton="cancel"
          onPrimaryAction={handleConfirm}
        >
          <FormattedMessage id="upload.confirmCloseUploadDialog.content" />
        </AlertDialog>
      )}
    </DialogContainer>
  );
}
