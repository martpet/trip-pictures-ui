import { persistedViewportKeyMap } from '~/consts';

type PersistedKeyMap = typeof persistedViewportKeyMap;

export type PersistedViewportKey = keyof PersistedKeyMap;
export type PersistedViewportShortKey = PersistedKeyMap[PersistedViewportKey];
