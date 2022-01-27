import { Button } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/components/Upload';

export function ButtonUpload() {
  const { files } = useContext(UploadContext);

  if (!files.length) return null;

  return (
    <Button variant="cta" autoFocus>
      <FormattedMessage id="upload.button.start" />
    </Button>
  );
}
