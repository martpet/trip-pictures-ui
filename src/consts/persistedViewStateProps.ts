import { ViewState } from 'react-map-gl';

export const persistedViewStateProps: Readonly<Exclude<keyof ViewState, 'padding'>[]> = [
  'latitude',
  'longitude',
  'zoom',
  'pitch',
  'bearing',
];
