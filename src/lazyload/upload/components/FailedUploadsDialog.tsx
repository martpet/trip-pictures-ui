import { AlertDialog, DialogContainer, Flex, View } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PreviewImage, UploadContext } from '~/lazyload/upload';

export function FailedUploadsDialog() {
  const { formatMessage } = useIntl();
  const {
    failedToTransferUploads,
    isFailedUploadsDialogOpen,
    closeUploadDialog,
    setFailedUploadsDialogOpen,
  } = useContext(UploadContext);

  const handleConfirm = () => {
    setFailedUploadsDialogOpen(false);
    closeUploadDialog();
  };
  const handleDismiss = handleConfirm;

  return (
    <DialogContainer onDismiss={handleDismiss}>
      {isFailedUploadsDialogOpen && (
        <AlertDialog
          variant="information"
          title={formatMessage(
            { id: 'upload.failedUploadsDialog.title' },
            { count: failedToTransferUploads.length }
          )}
          primaryActionLabel={formatMessage({
            id: 'upload.failedUploadsDialog.primaryAction',
          })}
          onPrimaryAction={handleConfirm}
        >
          <View marginBottom="size-200">
            <AlertIcon color="notice" size="S" marginEnd="size-125" />
            <FormattedMessage
              id="upload.failedUploadsDialog.content"
              values={{ count: failedToTransferUploads.length }}
            />
          </View>

          <Flex direction="column" gap="size-100">
            {failedToTransferUploads.map((upload) => (
              <PreviewImage upload={upload} />
            ))}
          </Flex>
        </AlertDialog>
      )}
    </DialogContainer>
  );
}
