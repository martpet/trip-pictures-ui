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

import { UploadContext } from '~/components';
import { Upload } from '~/components/Upload';

type UploadDialogProps = {
  close(): void;
};

export function UploadDialog({ close }: UploadDialogProps) {
  const { files } = useContext(UploadContext);

  return (
    <Dialog>
      <Heading>
        <FormattedMessage id="dialog.upload.heading" />
      </Heading>
      <Divider />
      <Content>
        <Upload />
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={close}>
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button variant="cta" onPress={close} isDisabled={!files.length}>
          <FormattedMessage id="upload.dialog.uploadButton" />
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
