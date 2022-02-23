import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/lazy/upload';

type Arg = {
  setUploads: Dispatch<SetStateAction<Upload[]>>;
  validUploads: Upload[];
  isUploading: boolean;
  isUploadComplete: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setShowConfirmClose: Dispatch<SetStateAction<boolean>>;
};

export const useOpenCloseDialog = ({
  setUploads,
  isUploading,
  isUploadComplete,
  validUploads,
  setDialogOpen,
  setShowConfirmClose,
}: Arg) => {
  const closeDialog = (forceClose?: boolean) => {
    if (isUploading) return;

    if (!isUploadComplete && validUploads.length && !forceClose) {
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
