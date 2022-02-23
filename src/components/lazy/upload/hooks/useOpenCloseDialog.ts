import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/components/lazy/upload';

type Arg = {
  setUploads: Dispatch<SetStateAction<Upload[]>>;
  validUploads: Upload[];
  isUploading: boolean;
  isUploadDone: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmCloseUploadDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const useOpenCloseDialog = ({
  setUploads,
  isUploading,
  isUploadDone,
  validUploads,
  setDialogOpen,
  setConfirmCloseUploadDialogOpen,
}: Arg) => {
  const closeUploadDialog = (forceClose?: boolean) => {
    if (isUploading) return;

    if (!isUploadDone && validUploads.length && !forceClose) {
      setConfirmCloseUploadDialogOpen(true);
    } else {
      setConfirmCloseUploadDialogOpen(false);
      setDialogOpen(false);
      setUploads([]);
    }
  };

  return {
    openUploadDialog: () => setDialogOpen(true),
    closeUploadDialog,
  };
};
