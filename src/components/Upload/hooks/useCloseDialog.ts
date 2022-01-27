import { Dispatch, SetStateAction } from 'react';

type UseCloseDialog = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setShowConfirmClose: Dispatch<SetStateAction<boolean>>;
};

export const useCloseDialog = ({
  files,
  setFiles,
  setDialogOpen,
  setShowConfirmClose,
}: UseCloseDialog) => {
  return (forceClose?: boolean) => {
    if (files.length && !forceClose) {
      setShowConfirmClose(true);
    } else {
      setShowConfirmClose(false);
      setDialogOpen(false);
      setFiles([]);
    }
  };
};
