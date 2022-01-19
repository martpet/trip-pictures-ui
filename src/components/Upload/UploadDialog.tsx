import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Heading,
} from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { AddPhotosButton, Preview, UploadContext } from '~/components/Upload';

type UploadDialogProps = {
  close(): void;
};

export function UploadDialog({ close }: UploadDialogProps) {
  const { files, setFiles } = useContext(UploadContext);

  const handleCancel = () => {
    setFiles([]);
    close();
  };

  return (
    <Dialog>
      <Heading>
        <FormattedMessage id="dialog.upload.heading" />
      </Heading>
      <Divider />
      <Content>
        <Preview />
        <AddPhotosButton />
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={handleCancel}>
          <FormattedMessage id="upload.dialog.button.cancel" />
        </Button>
        {files.length > 0 && (
          <Button variant="cta" autoFocus>
            <FormattedMessage id="upload.dialog.button.post" />
          </Button>
        )}
      </ButtonGroup>
    </Dialog>
  );
}
