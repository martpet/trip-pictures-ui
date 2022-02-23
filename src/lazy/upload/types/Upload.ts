import { UploadError, UploadExifData } from '~/lazy/upload';

export type Upload = {
  id: string;
  file: File;
  exif: UploadExifData;
  errors: UploadError[];
  canRotate: boolean;
  isComplete: boolean;
};
