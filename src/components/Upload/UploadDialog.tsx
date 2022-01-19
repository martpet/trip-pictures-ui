import { Content, Dialog, Divider, Heading } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';

import { Upload } from '~/components/Upload';

export function UploadDialog() {
  return (
    <Dialog>
      <Heading>
        <FormattedMessage id="dialog.upload.heading" />
      </Heading>
      <Divider />
      <Content>
        <Upload />
      </Content>
    </Dialog>
  );
}
