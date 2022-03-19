import { Settings } from '~/types';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  settings?: Partial<Settings>;
  email?: string;
};
