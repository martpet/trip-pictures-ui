import { ViewState } from 'react-map-gl';

import { persistedViewStateProps } from '~/consts';

export type PersistedViewStateProp = typeof persistedViewStateProps[number];

export type PersistedViewState = Partial<Pick<ViewState, PersistedViewStateProp>> &
  Pick<ViewState, 'longitude' | 'latitude'>;
