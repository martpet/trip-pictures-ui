import { PhotoExifData, UploadValidityError } from '~/lazy/upload';

export type Upload = {
  id: string;
  file: File;
  exif: Partial<PhotoExifData>;
  validityErrors: UploadValidityError[];
  canRotate: boolean;
  isStarted: boolean;
  isComplete: boolean;
  isFailed: boolean;
  progress: number;
  s3uuid?: string;
};
