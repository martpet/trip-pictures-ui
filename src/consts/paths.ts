import { viewStateUrlPrefix } from '~/consts/viewStateUrlPrefix';

export const paths = {
  home: '/',
  mapstate: `${viewStateUrlPrefix}:viewstate`,
  notFound: '*',
} as const;
