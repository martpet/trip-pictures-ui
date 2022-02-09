export type Upload = {
  file: File;
  data: UploadExifData;
  errors: UploadError[];
};

export type UploadExifData = {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  bearing?: number;
};

type UploadError = 'coords' | 'fileType' | 'exif';
