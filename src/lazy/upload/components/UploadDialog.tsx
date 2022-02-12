import { Dialog, DialogTrigger, Divider } from '@adobe/react-spectrum';
import { Dispatch, ReactNode, SetStateAction, useContext } from 'react';

import { useIsMobile } from '~/hooks';
import {
  ConfirmCloseDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  UploadContext,
  UploadProvider,
  useCloseOnEscapeKey,
} from '~/lazy/upload';

type Props = {
  trigger: ReactNode;
};

function UploadDialog({ trigger }: Props) {
  const { isDialogOpen } = useContext(UploadContext);
  const isMobile = useIsMobile();
  const dialogType = isMobile ? 'fullscreenTakeover' : 'fullscreen';

  useCloseOnEscapeKey();

  return (
    <>
      <DialogTrigger type={dialogType} isOpen={isDialogOpen}>
        <div>{trigger}</div>
        <Dialog>
          <DialogHeader />
          <Divider />
          <DialogContent />
          <DialogButtons />
        </Dialog>
      </DialogTrigger>
      <ConfirmCloseDialog />
    </>
  );
}

type WithProviderProps = Props & {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function WithProvider({ isOpen, setOpen, ...props }: WithProviderProps) {
  return (
    <UploadProvider isDialogOpen={isOpen} setDialogOpen={setOpen}>
      <UploadDialog {...props} />
    </UploadProvider>
  );
}

export { WithProvider as UploadDialog };
