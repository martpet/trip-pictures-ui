import { Settings } from '~/types';

export type User = {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  settings?: Partial<Settings>;
  email?: string;
};
