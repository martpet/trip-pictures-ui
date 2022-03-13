import { viewportUrlPathPrefix } from '~/consts/viewport';

export const paths = {
  home: '/',
  viewport: `${viewportUrlPathPrefix}:viewport`,
  notFound: '*',
} as const;
