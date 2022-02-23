import { UploadExifData, UploadValidityError } from '~/components/lazy/upload';

export type Upload = {
  id: string;
  file: File;
  exif: UploadExifData;
  validityErrors: UploadValidityError[];
  canRotate: boolean;
  isStarted: boolean;
  isComplete: boolean;
  isFailed: boolean;
};
