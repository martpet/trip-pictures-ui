import { createContext, Dispatch, SetStateAction } from 'react';

import { Upload } from '~/lazy/upload';

type Context = {
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

export const UploadContext = createContext({} as Context);
