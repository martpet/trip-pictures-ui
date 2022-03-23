import { Button, ProgressCircle } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext, useMakeUpload } from '~/lazyload/upload';

export function ButtonStartUpload() {
  const { validUploads, isUploadStarted } = useContext(UploadContext);
  const { startUpload } = useMakeUpload();

  if (!validUploads.length) return null;

  return (
    <Button variant="cta" autoFocus onPress={startUpload} isDisabled={isUploadStarted}>
      {isUploadStarted && (
        <ProgressCircle isIndeterminate size="S" marginEnd="size-150" />
      )}
      <FormattedMessage
        id="upload.button.start"
        values={{ count: validUploads.length }}
      />
    </Button>
  );
}
