import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/types';

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

  const closeDialog = (forceClose?: boolean) => {
    if (uploads.length && !forceClose) {
      setShowConfirmClose(true);
    } else {
      setShowConfirmClose(false);
      setDialogOpen(false);
      setUploads([]);
    }
  };

  return { openDialog, closeDialog };
};
