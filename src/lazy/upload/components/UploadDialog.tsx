import { Dialog, Divider } from '@adobe/react-spectrum';
import { Dispatch, SetStateAction } from 'react';

import {
  ConfirmCloseDialog,
  DialogButtons,
  DialogContent,
  DialogHeader,
  UploadProvider,
  useCloseOnEscapeKey,
} from '~/lazy/upload';

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function UploadDialog({ isOpen, setOpen }: Props) {
  useCloseOnEscapeKey();

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
