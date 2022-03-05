import { Button, ProgressCircle } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext, useS3Upload } from '~/lazy/upload';

export function ButtonStartUpload() {
  const { canStartUpload, validUploads, isUploading, isUploadDone } =
    useContext(UploadContext);
  const { startUpload } = useS3Upload();
  const handlePress = () => startUpload();

  if (!canStartUpload) return null;

  return (
    <Button variant="cta" autoFocus onPress={handlePress} isDisabled={isUploading}>
      {(isUploading || isUploadDone) && (
        <ProgressCircle isIndeterminate size="S" marginEnd="size-150" />
      )}
      <FormattedMessage
        id="upload.button.start"
        values={{ count: validUploads.length }}
      />
    </Button>
  );
}
