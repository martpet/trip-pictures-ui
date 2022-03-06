import { createTransform } from 'redux-persist';

import { getViewportFromUrl } from '~/utils';

export const mapViewportTransform = createTransform(
  undefined,
  (persistedViewport) => {
    return getViewportFromUrl() || persistedViewport;
  },
  { whitelist: ['mapViewport'] }
);
