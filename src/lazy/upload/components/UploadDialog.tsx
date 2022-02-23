import { Dialog, Divider } from '@adobe/react-spectrum';
import { Dispatch, SetStateAction } from 'react';

import {
  ConfirmCloseDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  UploadProvider,
  useCloseOnEscapeKey,
  useOnComplete,
} from '~/lazy/upload';

function UploadDialog() {
  useCloseOnEscapeKey();
  useOnComplete();

  return (
    <>
      <Dialog>
        <DialogHeader />
        <Divider />
        <DialogContent />
        <DialogButtons />
      </Dialog>
      <ConfirmCloseDialog />
    </>
  );
}

type ProviderProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function Provider({ isOpen, setOpen }: ProviderProps) {
  return (
    <UploadProvider isDialogOpen={isOpen} setDialogOpen={setOpen}>
      <UploadDialog />
    </UploadProvider>
  );
}

export { Provider as UploadDialog };
