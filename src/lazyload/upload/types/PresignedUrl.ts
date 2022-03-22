import { Upload } from '~/lazyload/upload';

export type PresignedUrl = {
  uploadId: Upload['id'];
  s3uuid: Upload['s3uuid'];
  duplicatePhotoId: Upload['duplicatePhotoId'];
  url: string;
  fields: { [key: string]: string };
};
