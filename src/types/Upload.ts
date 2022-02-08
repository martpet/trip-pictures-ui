export type Upload = {
  file: File;
  data: UploadExifData;
  missingData: Array<keyof Upload['data']>;
  canUpload: boolean;
};

export type UploadExifData = {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  bearing?: number;
};
