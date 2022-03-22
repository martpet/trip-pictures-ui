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
  useFilteredUploads,
  useOpenCloseDialog,
  useRotateImage,
  useUploadsEntities,
} from '~/lazyload/upload';

type ContextValue = {
  uploads: Upload[];
  validUploads: Upload[];
  invalidUploads: Upload[];
  completedUploads: Upload[];
  failedUploads: Upload[];
  addUploads(files: FileList): void;
  removeUpload(id: string): void;
  editUpload(id: string, patch: Partial<Upload>): void;
  canStartUpload: boolean;
  isUploading: boolean;
  isUploadDone: boolean;
  isDialogOpen: boolean;
  openUploadDialog(): void;
  closeUploadDialog(forceClose?: boolean): void;
  isConfirmCloseUploadDialogOpen: boolean;
  setConfirmCloseUploadDialogOpen: Dispatch<SetStateAction<boolean>>;
  isFailedUploadsDialogOpen: boolean;
  setFailedUploadsDialogOpen: Dispatch<SetStateAction<boolean>>;
  rotateImage(uploadId: string): Promise<void>;
};

export const UploadContext = createContext({} as ContextValue);

type Props = {
  children: ReactNode;
  isDialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function UploadProvider({ children, isDialogOpen, setDialogOpen }: Props) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isConfirmCloseUploadDialogOpen, setConfirmCloseUploadDialogOpen] =
    useState(false);
  const [isFailedUploadsDialogOpen, setFailedUploadsDialogOpen] = useState(false);
  const { validUploads, invalidUploads, completedUploads, failedUploads } =
    useFilteredUploads({ uploads });
  const canStartUpload = useCanStartUpload({ validUploads });
  const isUploadDone =
    Boolean(validUploads.length) &&
    validUploads.every(({ isComplete, isFailed }: Upload) => isComplete || isFailed);
  const isUploading = !isUploadDone && uploads.some((upload) => upload.isStarted);
  const { addUploads, removeUpload, editUpload } = useUploadsEntities({
    uploads,
    setUploads,
    isUploading,
  });
  const rotateImage = useRotateImage({ uploads, editUpload });
  const { openUploadDialog, closeUploadDialog } = useOpenCloseDialog({
    setUploads,
    validUploads,
    isUploading,
    isUploadDone,
    setDialogOpen,
    setConfirmCloseUploadDialogOpen,
  });

  const contextValue = useMemo(
    (): ContextValue => ({
      uploads,
      validUploads,
      invalidUploads,
      completedUploads,
      failedUploads,
      addUploads,
      removeUpload,
      editUpload,
      canStartUpload,
      isUploading,
      isUploadDone,
      isDialogOpen,
      openUploadDialog,
      closeUploadDialog,
      isConfirmCloseUploadDialogOpen,
      setConfirmCloseUploadDialogOpen,
      isFailedUploadsDialogOpen,
      setFailedUploadsDialogOpen,
      rotateImage,
    }),
    [uploads, isDialogOpen, isConfirmCloseUploadDialogOpen, isFailedUploadsDialogOpen]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
