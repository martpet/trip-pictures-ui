import { UploadError, UploadExifData } from '~/lazy/upload';

export type Upload = {
  file: File;
  data: UploadExifData;
  errors: UploadError[];
};
