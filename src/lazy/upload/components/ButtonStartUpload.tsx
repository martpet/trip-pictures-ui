import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/lazy/upload';
import { useGeneratePhotoUploadUrlsMutation } from '~/services';

export function ButtonStartUpload() {
  const { canStartUpload, validUploads } = useContext(UploadContext);
  const [generateUploadUrls] = useGeneratePhotoUploadUrlsMutation();

  const handlePress = () => {
    generateUploadUrls({ uploadsSize: 5 });
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
