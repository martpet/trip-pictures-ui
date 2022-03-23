import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext, useEscapeKey } from '~/lazyload/upload';

export function ButtonCloseDialog() {
  const { closeUploadDialog, isUploadStarted } = useContext(UploadContext);
  const handlePress = () => closeUploadDialog();

  useEscapeKey();

  if (isUploadStarted) return null;

  return (
    <Button variant="secondary" onPress={handlePress}>
      <FormattedMessage id="upload.button.cancel" />
    </Button>
  );
}
