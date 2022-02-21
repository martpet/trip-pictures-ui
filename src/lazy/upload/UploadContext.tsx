import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import {
  Upload,
  useAddUploads,
  useCanStartUpload,
  useOpenCloseDialog,
  useRemoveUpload,
  useRotateImage,
  useValidUploads,
} from '~/lazy/upload';

type UploadContextType = {
  uploads: Upload[];
  validUploads: Upload[];
  invalidUploads: Upload[];
  addUploads(files: FileList): void;
  removeUpload(i: number): void;
  canStartUpload: boolean;
  rotateImage(i: number): Promise<void>;
  openDialog(): void;
  closeDialog(forceClose?: boolean): void;
  isDialogOpen: boolean;
  showConfirmClose: boolean;
  setShowConfirmClose: Dispatch<SetStateAction<boolean>>;
};

export const UploadContext = createContext({} as UploadContextType);

type ProviderProps = {
  children: ReactNode;
  isDialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function UploadProvider({ children, isDialogOpen, setDialogOpen }: ProviderProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const { validUploads, invalidUploads } = useValidUploads({ uploads });
  const addUploads = useAddUploads({ uploads, setUploads });
  const removeUpload = useRemoveUpload({ uploads, setUploads });
  const canStartUpload = useCanStartUpload({ uploads });
  const rotateImage = useRotateImage({ uploads, setUploads });
  const { openDialog, closeDialog } = useOpenCloseDialog({
    uploads,
    setUploads,
    setDialogOpen,
    setShowConfirmClose,
  });
  const contextValue = useMemo(
    () => ({
      uploads,
      validUploads,
      invalidUploads,
      addUploads,
      removeUpload,
      canStartUpload,
      rotateImage,
      isDialogOpen,
      openDialog,
      closeDialog,
      showConfirmClose,
      setShowConfirmClose,
    }),
    [uploads, isDialogOpen, showConfirmClose]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
