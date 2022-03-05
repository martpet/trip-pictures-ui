import { PhotoExifData } from '~/lazy/upload';

export type Photo = {
  url: string;
} & PhotoExifData;
