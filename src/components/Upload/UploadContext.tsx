import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import {
  useAddRemoveUploads,
  useOpenCloseDialog,
  useRotateImage,
} from '~/components/Upload';
import { Upload } from '~/types';

type Context = {
  uploads: Upload[];
  addUploads(files: FileList): void;
  removeUpload(i: number): void;
  rotateImage(i: number): Promise<void>;
  openDialog(): void;
  closeDialog(forceClose?: boolean): void;
  isDialogOpen: boolean;
  showConfirmClose: boolean;
  setShowConfirmClose: Dispatch<SetStateAction<boolean>>;
};

export const UploadContext = createContext({} as Context);

type ProviderProps = {
  children: ReactNode;
};

export function UploadProvider({ children }: ProviderProps) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const { addUploads, removeUpload } = useAddRemoveUploads({ uploads, setUploads });
  const { openDialog, closeDialog } = useOpenCloseDialog({
    uploads,
    setUploads,
    setDialogOpen,
    setShowConfirmClose,
  });
  const rotateImage = useRotateImage({ uploads, setUploads });

  const contextValue = useMemo(
    () => ({
      uploads,
      addUploads,
      removeUpload,
      rotateImage,
      openDialog,
      closeDialog,
      isDialogOpen,
      showConfirmClose,
      setShowConfirmClose,
    }),
    [uploads, isDialogOpen, showConfirmClose]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
