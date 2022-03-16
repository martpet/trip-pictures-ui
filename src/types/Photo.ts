import { PhotoExifData } from '~/lazyload/upload';

export type Photo = {
  url: string;
} & PhotoExifData;
