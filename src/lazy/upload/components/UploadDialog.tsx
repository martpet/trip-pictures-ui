import { Dialog, Divider } from '@adobe/react-spectrum';
import { Dispatch, SetStateAction } from 'react';

import {
  ConfirmCloseDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  UploadProvider,
} from '~/lazy/upload';

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function UploadDialog({ isOpen, setOpen }: Props) {
  return (
    <UploadProvider isDialogOpen={isOpen} setDialogOpen={setOpen}>
      <Dialog>
        <DialogHeader />
        <Divider />
        <DialogContent />
        <DialogButtons />
      </Dialog>
      <ConfirmCloseDialog />
    </UploadProvider>
  );
}
