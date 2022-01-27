import { AlertDialog, DialogContainer } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { UploadContext } from '~/components/Upload';

export function ConfirmCloseUploadDialog() {
  const { showConfirmClose, setShowConfirmClose, closeDialog } =
    useContext(UploadContext);

  const handleConfirm = () => closeDialog(true);
  const handleDismiss = () => setShowConfirmClose(false);

  return (
    <DialogContainer onDismiss={handleDismiss}>
      {showConfirmClose && (
        <AlertDialog
          variant="destructive"
          title="Are you sure?"
          primaryActionLabel="Yes, cancel upload"
          cancelLabel="No, stay"
          autoFocusButton="cancel"
          onPrimaryAction={handleConfirm}
        >
          Do you want to cancel all unfinished uploads?
        </AlertDialog>
      )}
    </DialogContainer>
  );
}
