import { PersistedViewportKey } from '~/types';

export const persistedViewportKeyMap = {
  latitude: 'lat',
  longitude: 'lon',
  zoom: 'z',
  bearing: 'b',
  pitch: 'p',
} as const;

export const persistedViewportKeys = Object.keys(
  persistedViewportKeyMap
) as PersistedViewportKey[];

export const persistedViewportShortKeys = Object.values(persistedViewportKeyMap);
