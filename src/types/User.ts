import { Settings } from '~/types';

export interface User {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  settings?: Partial<Settings>;
  email?: string;
}
