export type Upload = {
  file: File;
  canUpload: boolean;
  gps?: ExifReader.GpsTags;
};
