import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/components/Upload';

export function ButtonCancel() {
  const { closeDialog } = useContext(UploadContext);

  const handlePress = () => closeDialog();

  return (
    <Button variant="secondary" onPress={handlePress}>
      <FormattedMessage id="upload.button.cancel" />
    </Button>
  );
}
