import { ViewState } from 'react-map-gl';

export type PersistedViewState = Omit<ViewState, 'padding'>;
