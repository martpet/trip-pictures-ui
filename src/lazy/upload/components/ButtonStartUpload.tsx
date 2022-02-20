import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/lazy/upload';
import { useCreatePresignedPhotoUploadUrlsMutation } from '~/services';

export function ButtonStartUpload() {
  const { canStartUpload, validUploads } = useContext(UploadContext);
  const [createPresignedUploadUrls] = useCreatePresignedPhotoUploadUrlsMutation();

  const handlePress = () => {
    createPresignedUploadUrls({ uploadsLength: validUploads.length });
  };

  if (!canStartUpload) return null;

  return (
    <Button variant="cta" autoFocus onPress={handlePress}>
      <FormattedMessage
        id="upload.button.start"
        values={{ count: validUploads.length }}
      />
    </Button>
  );
}
