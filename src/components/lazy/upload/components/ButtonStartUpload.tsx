import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext, useUploadToS3 } from '~/components/lazy/upload';

export function ButtonStartUpload() {
  const { canStartUpload, validUploads, isUploading } = useContext(UploadContext);
  const uploadToS3 = useUploadToS3();
  const handlePress = () => uploadToS3();

  if (!canStartUpload) return null;

  return (
    <Button variant="cta" autoFocus onPress={handlePress} isDisabled={isUploading}>
      <FormattedMessage
        id="upload.button.start"
        values={{ count: validUploads.length }}
      />
    </Button>
  );
}
