import { PhotoExifData } from '~/types/PhotoExifData';
import { User } from '~/types/User';

export type Photo = PhotoExifData & {
  id: User['id'];
  url: string;
};
