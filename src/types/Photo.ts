import { User } from '~/types/User';

export type Photo = PhotoExifData & {
  id: User['id'];
  url: string;
};

export type PhotoExifData = {
  latitude: number;
  longitude: number;
  altitude: number;
  bearing: number;
  dateOriginal: string;
};
