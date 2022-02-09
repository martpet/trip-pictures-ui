import {
  ActionButton,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Header,
  Heading,
} from '@adobe/react-spectrum';
import { ReactNode, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useIsMobile } from '~/hooks';
import {
  ButtonAddPhotos,
  ButtonCloseDialog,
  ButtonStartUpload,
  DialogConfirmCloseUpload,
  DropZone,
  Preview,
  UploadContext,
  UploadProvider,
  useEscKeyCloseDialog,
} from '~/lazy/upload';

type Props = {
  trigger: ReactNode;
};

function UploadDialog({ trigger }: Props) {
  const { formatMessage } = useIntl();
  const { uploads, openDialog, isDialogOpen } = useContext(UploadContext);
  const isMobile = useIsMobile();

  useEscKeyCloseDialog();

  return (
    <>
      <DialogTrigger
        type={isMobile ? 'fullscreenTakeover' : 'fullscreen'}
        isOpen={isDialogOpen}
      >
        <ActionButton
          onPress={openDialog}
          isQuiet
          aria-label={formatMessage({ id: 'toolbar.button.upload' })}
        >
          {trigger}
        </ActionButton>
        <Dialog>
          <Heading>
            <FormattedMessage id="upload.heading" />
          </Heading>
          <Header>{!isMobile && !!uploads.length && <ButtonAddPhotos />}</Header>
          <Divider />
          <Content>
            <DropZone>
              <Preview />
            </DropZone>
          </Content>
          <ButtonGroup>
            <ButtonCloseDialog />
            <ButtonStartUpload />
          </ButtonGroup>
        </Dialog>
      </DialogTrigger>
      <DialogConfirmCloseUpload />
    </>
  );
}

function WithContext({ trigger }: Props) {
  return (
    <UploadProvider>
      <UploadDialog trigger={trigger} />
    </UploadProvider>
  );
}

export { WithContext as UploadDialog };
