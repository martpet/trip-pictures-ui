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

  return {
    openDialog: () => setDialogOpen(true),
    closeDialog,
  };
};
