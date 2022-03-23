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
  useFilteredUploads,
  useOpenCloseDialog,
  useRotateImage,
  useUploadsEntities,
} from '~/lazyload/upload';

type ContextValue = {
  uploads: Upload[];
  validUploads: Upload[];
  invalidUploads: Upload[];
  trasferredUploads: Upload[];
  failedToTransferUploads: Upload[];
  addUploads(files: FileList): void;
  removeUpload(id: string): void;
  editUpload(id: string, patch: Partial<Upload>): void;
  isUploadStarted: boolean;
  setUploadStarted: Dispatch<SetStateAction<boolean>>;
  isTransferringDone: boolean;
  isUploadDone: boolean;
  setUploadDone: Dispatch<SetStateAction<boolean>>;
  isDialogOpen: boolean;
  openUploadDialog(): void;
  closeUploadDialog(forceClose?: boolean): void;
  isConfirmCloseDialogOpen: boolean;
  setConfirmCloseDialogOpen: Dispatch<SetStateAction<boolean>>;
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
  const [isUploadStarted, setUploadStarted] = useState(false);
  const [isUploadDone, setUploadDone] = useState(false);
  const [isConfirmCloseDialogOpen, setConfirmCloseDialogOpen] = useState(false);
  const [isFailedUploadsDialogOpen, setFailedUploadsDialogOpen] = useState(false);
  const { validUploads, invalidUploads, trasferredUploads, failedToTransferUploads } =
    useFilteredUploads({ uploads });
  const isTransferringDone =
    Boolean(validUploads.length) &&
    validUploads.every(
      ({ transferCompleted, transferFailed }) => transferCompleted || transferFailed
    );
  const { addUploads, removeUpload, editUpload } = useUploadsEntities({
    uploads,
    setUploads,
    isUploadStarted,
  });
  const rotateImage = useRotateImage({ uploads, editUpload });
  const { openUploadDialog, closeUploadDialog } = useOpenCloseDialog({
    setUploads,
    validUploads,
    isUploadStarted,
    isUploadDone,
    setDialogOpen,
    setConfirmCloseDialogOpen,
  });

  const contextValue = useMemo(
    (): ContextValue => ({
      uploads,
      validUploads,
      invalidUploads,
      trasferredUploads,
      failedToTransferUploads,
      addUploads,
      removeUpload,
      editUpload,
      isUploadStarted,
      setUploadStarted,
      isTransferringDone,
      isUploadDone,
      setUploadDone,
      isDialogOpen,
      openUploadDialog,
      closeUploadDialog,
      isConfirmCloseDialogOpen,
      setConfirmCloseDialogOpen,
      isFailedUploadsDialogOpen,
      setFailedUploadsDialogOpen,
      rotateImage,
    }),
    [
      uploads,
      isUploadStarted,
      isUploadDone,
      isDialogOpen,
      isConfirmCloseDialogOpen,
      isFailedUploadsDialogOpen,
    ]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
