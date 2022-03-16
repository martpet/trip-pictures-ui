import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';

import {
  Upload,
  UploadContext,
  useCanStartUpload,
  useFilteredUploads,
  useOpenCloseDialog,
  useRotateImage,
  useUploads,
} from '~/lazyload/upload';

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

  const context = useMemo(
    () => ({
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

  return <UploadContext.Provider value={context}>{children}</UploadContext.Provider>;
}
