import { ViewState } from 'react-map-gl';
import { createTransform } from 'redux-persist';

import { persistedViewStateProps } from '~/consts';
import { viewStateProp } from '~/slices';
import { PersistedViewState } from '~/types';

export const viewStateTransform = createTransform(
  undefined,

  (outboundState: ViewState) => {
    const transformedState = {} as PersistedViewState;

    persistedViewStateProps.forEach((key) => {
      const value = outboundState[key];
      if (value) {
        transformedState[key] = value;
      }
    });

    return transformedState;
  },

  { whitelist: [viewStateProp] }
);
