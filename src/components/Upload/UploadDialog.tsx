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
import { ReactNode, useContext, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  ButtonAddPhotos,
  ButtonCancel,
  ButtonUpload,
  ConfirmCloseUploadDialog,
  DropZone,
  PhotosPreview,
  UploadContext,
  UploadProvider,
} from '~/components/Upload';

type Props = {
  trigger: ReactNode;
};

function UploadDialog({ trigger }: Props) {
  const { formatMessage } = useIntl();
  const { files, openDialog, closeDialog, isDialogOpen } = useContext(UploadContext);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Escape' && !files.length) closeDialog();
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [closeDialog]);

  return (
    <>
      <DialogTrigger type="fullscreen" isOpen={isDialogOpen}>
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
          <Header>{!!files.length && <ButtonAddPhotos />}</Header>
          <Divider />
          <Content>
            <DropZone>
              <PhotosPreview />
            </DropZone>
          </Content>
          <ButtonGroup>
            <ButtonCancel />
            <ButtonUpload />
          </ButtonGroup>
        </Dialog>
      </DialogTrigger>
      <ConfirmCloseUploadDialog />
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
