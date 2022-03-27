import { PersistedViewState } from '~/types';

export const persistedViewStateProps: Readonly<(keyof PersistedViewState)[]> = [
  'longitude',
  'latitude',
  'zoom',
  'pitch',
  'bearing',
];
