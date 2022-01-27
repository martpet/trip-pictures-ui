import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { useAddFiles, useCloseDialog } from '~/components/Upload';

type UploadContextType = {
  files: File[];
  addFiles(files: FileList): void;
  openDialog(): void;
  closeDialog(forceClose?: boolean): void;
  isDialogOpen: boolean;
  showConfirmClose: boolean;
  setShowConfirmClose: Dispatch<SetStateAction<boolean>>;
};

export const UploadContext = createContext({} as UploadContextType);

type UploadProviderProps = {
  children: ReactNode;
};

export function UploadProvider({ children }: UploadProviderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const addFiles = useAddFiles({ files, setFiles });
  const openDialog = () => setDialogOpen(true);
  const closeDialog = useCloseDialog({
    files,
    setFiles,
    setDialogOpen,
    setShowConfirmClose,
  });
  const contextValue = useMemo(
    () => ({
      files,
      addFiles,
      openDialog,
      closeDialog,
      isDialogOpen,
      showConfirmClose,
      setShowConfirmClose,
    }),
    [files, isDialogOpen, showConfirmClose]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
