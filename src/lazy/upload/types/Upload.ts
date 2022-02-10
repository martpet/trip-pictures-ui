import { UploadError, UploadExifData } from '~/lazy/upload';

export type Upload = {
  file: File;
  exif: UploadExifData;
  errors: UploadError[];
};
