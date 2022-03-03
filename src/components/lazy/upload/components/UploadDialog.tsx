import { Dialog, Divider } from '@adobe/react-spectrum';
import { Dispatch, memo, SetStateAction } from 'react';

import {
  ConfirmCloseUploadDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  FailedUploadsDialog,
  UploadProvider,
} from '~/components/lazy/upload';

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function UploadDialog() {
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

function Provider({ isOpen, setOpen }: Props) {
  return (
    <UploadProvider isDialogOpen={isOpen} setDialogOpen={setOpen}>
      <MemoizedComponent />
    </UploadProvider>
  );
}

export { Provider as UploadDialog };
