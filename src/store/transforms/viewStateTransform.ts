import { ViewState } from 'react-map-gl';
import { createTransform } from 'redux-persist';

import { persistedViewStateProps } from '~/consts';
import { viewStateProp } from '~/slices';
import { PersistedViewState } from '~/types';
import { getViewStateFromUrl } from '~/utils';

export const viewStateTransform = createTransform(
  undefined,

  (outboundState: ViewState) => {
    const transformedState = {} as PersistedViewState;

    persistedViewStateProps.forEach((key) => {
      const value = outboundState[key];
      if (value) transformedState[key] = value;
    });

    return getViewStateFromUrl() || transformedState;
  },

  { whitelist: [viewStateProp] }
);
