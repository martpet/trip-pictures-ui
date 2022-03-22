import { UploadValidityError } from '~/lazyload/upload';
import { PhotoExifData } from '~/types';

export type Upload = {
  id: string;
  file: File;
  exif: Partial<PhotoExifData>;
  validityErrors: UploadValidityError[];
  canRotate: boolean;
  isStarted: boolean;
  isComplete: boolean;
  isFailed: boolean;
  duplicatePhotoId?: number;
  progress: number;
  s3uuid?: string;
};
