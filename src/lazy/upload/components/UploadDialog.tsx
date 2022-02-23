import { Dialog, Divider } from '@adobe/react-spectrum';
import { Dispatch, memo, SetStateAction } from 'react';

import {
  ConfirmCloseDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  UploadProvider,
  useCloseOnEscapeKey,
  useHandleUploadComplete,
} from '~/lazy/upload';

function UploadDialog() {
  useCloseOnEscapeKey();
  useHandleUploadComplete();

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

const MemoizedComponent = memo(UploadDialog);

type ProviderProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function Provider({ isOpen, setOpen }: ProviderProps) {
  return (
    <UploadProvider isDialogOpen={isOpen} setDialogOpen={setOpen}>
      <MemoizedComponent />
    </UploadProvider>
  );
}

export { Provider as UploadDialog };
