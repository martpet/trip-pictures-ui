import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Upload,
  useCanStartUpload,
  useFilteredUploads,
  useOpenCloseDialog,
  useRotateImage,
  useUploads,
} from '~/components/lazy/upload';
import { paths } from '~/consts';

type UploadContextType = {
  uploads: Upload[];
  validUploads: Upload[];
  invalidUploads: Upload[];
  completedUploads: Upload[];
  failedUploads: Upload[];
  addUploads(files: FileList): void;
  removeUpload(id: string): void;
  editUpload(id: string, patch: Partial<Upload>): void;
  rotateImage(uploadId: string): Promise<void>;
  canStartUpload: boolean;
  isUploading: boolean;
  isUploadDone: boolean;
  openUploadDialog(): void;
  closeUploadDialog(forceClose?: boolean): void;
  isDialogOpen: boolean;
  isConfirmCloseUploadDialogOpen: boolean;
  setConfirmCloseUploadDialogOpen: Dispatch<SetStateAction<boolean>>;
  isFailedUploadsDialogOpen: boolean;
  setFailedUploadsDialogOpen: Dispatch<SetStateAction<boolean>>;
  showPhotosOnMap(): void;
};

export const UploadContext = createContext({} as UploadContextType);

type ProviderProps = {
  children: ReactNode;
  isDialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function UploadProvider({ children, isDialogOpen, setDialogOpen }: ProviderProps) {
  const navigate = useNavigate();

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
  const { addUploads, removeUpload, editUpload } = useUploads({
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

  const showPhotosOnMap = () => {
    closeUploadDialog();
    navigate(paths.home);
  };

  const contextValue = useMemo(
    () => ({
      uploads,
      validUploads,
      invalidUploads,
      completedUploads,
      failedUploads,
      addUploads,
      removeUpload,
      editUpload,
      rotateImage,
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
      showPhotosOnMap,
    }),
    [
      uploads,
      isUploading,
      isDialogOpen,
      isConfirmCloseUploadDialogOpen,
      isFailedUploadsDialogOpen,
    ]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
