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
  useCanStartUpload,
  useOpenCloseDialog,
  useRotateImage,
  useUploads,
  useValidUploads,
} from '~/components/lazy/upload';

type UploadContextType = {
  uploads: Upload[];
  validUploads: Upload[];
  invalidUploads: Upload[];
  addUploads(files: FileList): void;
  removeUpload(id: string): void;
  editUpload(id: string, patch: Partial<Upload>): void;
  rotateImage(uploadId: string): Promise<void>;
  canStartUpload: boolean;
  isUploading: boolean;
  isUploadComplete: boolean;
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
  const { validUploads, invalidUploads } = useValidUploads({ uploads });
  const canStartUpload = useCanStartUpload({ uploads });
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const isUploadComplete =
    Boolean(validUploads.length) && validUploads.every(({ isComplete }) => isComplete);

  const isUploading = !isUploadComplete && uploads.some((upload) => upload.isStarted);

  const { addUploads, removeUpload, editUpload } = useUploads({
    uploads,
    setUploads,
    isUploading,
  });
  const rotateImage = useRotateImage({ uploads, editUpload });

  const { openDialog, closeDialog } = useOpenCloseDialog({
    setUploads,
    validUploads,
    isUploading,
    isUploadComplete,
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
      editUpload,
      rotateImage,
      canStartUpload,
      isUploading,
      isUploadComplete,
      isDialogOpen,
      openDialog,
      closeDialog,
      showConfirmClose,
      setShowConfirmClose,
    }),
    [uploads, isDialogOpen, isUploading, showConfirmClose]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
