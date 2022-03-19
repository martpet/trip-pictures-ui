import { PhotoExifData } from '~/lazyload/upload';
import { User } from '~/types/User';

export type Photo = PhotoExifData & {
  id: User['id'];
  url: string;
};
