import { UploadError, UploadExifData } from '~/components/lazy/upload';

export type Upload = {
  id: string;
  file: File;
  exif: UploadExifData;
  errors: UploadError[];
  canRotate: boolean;
  isStarted: boolean;
  isComplete: boolean;
};
