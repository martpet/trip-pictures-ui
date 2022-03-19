import { ViewportProps } from 'react-map-gl';

import { persistedViewportProps } from '~/consts';

export type Viewport = PersistedViewport | ViewportProps | undefined;
export type PersistedViewport = Required<Pick<ViewportProps, PersistedViewportProp>>;
export type PersistedViewportProp = typeof persistedViewportProps[number];
