import { Dispatch, SetStateAction } from 'react';

import { Upload, useCanStartUpload } from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setShowConfirmClose: Dispatch<SetStateAction<boolean>>;
};

export const useOpenCloseDialog = ({
  uploads,
  setUploads,
  setDialogOpen,
  setShowConfirmClose,
}: Arg) => {
  const openDialog = () => setDialogOpen(true);
  const canStartUpload = useCanStartUpload({ uploads });

  const closeDialog = (forceClose?: boolean) => {
    if (canStartUpload && !forceClose) {
      setShowConfirmClose(true);
    } else {
      setShowConfirmClose(false);
      setDialogOpen(false);
      setUploads([]);
    }
  };

  return { openDialog, closeDialog };
};
