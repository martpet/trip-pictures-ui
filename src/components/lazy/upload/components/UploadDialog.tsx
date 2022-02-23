import { Dialog, Divider } from '@adobe/react-spectrum';
import { Dispatch, memo, SetStateAction } from 'react';

import {
  ConfirmCloseUploadDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  FailedUploadsDialog,
  UploadProvider,
  useCloseOnEscapeKey,
  useHandleUploadDone,
} from '~/components/lazy/upload';

function UploadDialog() {
  useCloseOnEscapeKey();
  useHandleUploadDone();

  return (
    <>
      <Dialog>
        <DialogHeader />
        <Divider />
        <DialogContent />
        <DialogButtons />
      </Dialog>

      <ConfirmCloseUploadDialog />
      <FailedUploadsDialog />
    </>
  );
}

const MemoizedComponent = memo(UploadDialog);

type ProviderProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function WithProvider({ isOpen, setOpen }: ProviderProps) {
  return (
    <UploadProvider isDialogOpen={isOpen} setDialogOpen={setOpen}>
      <MemoizedComponent />
    </UploadProvider>
  );
}

export { WithProvider as UploadDialog };
