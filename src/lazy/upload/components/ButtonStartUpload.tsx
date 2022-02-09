import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/lazy/upload';

export function ButtonStartUpload() {
  const { canStartUpload, validUploads } = useContext(UploadContext);

  if (!canStartUpload) return null;

  return (
    <Button variant="cta" autoFocus>
      <FormattedMessage
        id="upload.button.start"
        values={{ count: validUploads.length }}
      />
    </Button>
  );
}
