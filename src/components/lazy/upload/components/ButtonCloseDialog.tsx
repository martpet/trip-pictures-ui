import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/components/lazy/upload';

export function ButtonCloseDialog() {
  const { closeUploadDialog, isUploading } = useContext(UploadContext);

  const handlePress = () => closeUploadDialog();

  if (isUploading) return null;

  return (
    <Button variant="secondary" onPress={handlePress}>
      <FormattedMessage id="upload.button.cancel" />
    </Button>
  );
}
