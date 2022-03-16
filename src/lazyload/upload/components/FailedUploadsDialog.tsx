import { AlertDialog, DialogContainer, Flex, View } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PreviewImage, UploadContext } from '~/lazyload/upload';

export function FailedUploadsDialog() {
  const { formatMessage } = useIntl();
  const { failedUploads, isFailedUploadsDialogOpen, closeUploadDialog } =
    useContext(UploadContext);

  const handleConfirm = () => closeUploadDialog();
  const handleDismiss = handleConfirm;

  return (
    <DialogContainer onDismiss={handleDismiss}>
      {isFailedUploadsDialogOpen && (
        <AlertDialog
          variant="information"
          title={formatMessage(
            { id: 'upload.failedUploadsDialog.title' },
            { count: failedUploads.length }
          )}
          primaryActionLabel={formatMessage({
            id: 'upload.failedUploadsDialog.primaryAction',
          })}
          onPrimaryAction={handleConfirm}
        >
          <View marginBottom="size-200">
            <FormattedMessage
              id="upload.failedUploadsDialog.content"
              values={{ count: failedUploads.length }}
            />
          </View>

          <Flex direction="column" gap="size-100">
            {failedUploads.map((upload) => (
              <PreviewImage upload={upload} />
            ))}
          </Flex>
        </AlertDialog>
      )}
    </DialogContainer>
  );
}
