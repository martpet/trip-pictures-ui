import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/lazyload/upload';

type Arg = {
  setUploads: Dispatch<SetStateAction<Upload[]>>;
  validUploads: Upload[];
  isUploadStarted: boolean;
  isUploadDone: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmCloseDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const useOpenCloseDialog = ({
  setUploads,
  isUploadStarted,
  isUploadDone,
  validUploads,
  setDialogOpen,
  setConfirmCloseDialogOpen,
}: Arg) => {
  const closeUploadDialog = (forceClose?: boolean) => {
    if (isUploadStarted && !isUploadDone) return;

    if (!isUploadDone && validUploads.length && !forceClose) {
      setConfirmCloseDialogOpen(true);
    } else {
      setConfirmCloseDialogOpen(false);
      setDialogOpen(false);
      setUploads([]);
    }
  };

  return {
    openUploadDialog: () => setDialogOpen(true),
    closeUploadDialog,
  };
};
