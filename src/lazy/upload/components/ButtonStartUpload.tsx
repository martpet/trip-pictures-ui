import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext, useStartUpload } from '~/lazy/upload';

export function ButtonStartUpload() {
  const { canStartUpload, validUploads, isUploading } = useContext(UploadContext);
  const startUpload = useStartUpload();

  if (!canStartUpload) return null;

  return (
    <Button variant="cta" autoFocus onPress={startUpload} isDisabled={isUploading}>
      <FormattedMessage
        id="upload.button.start"
        values={{ count: validUploads.length }}
      />
    </Button>
  );
}
