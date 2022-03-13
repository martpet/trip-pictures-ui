import { ViewportProps } from 'react-map-gl';

import { PersistedViewportProp } from '~/types/PersistedViewportProp';

export type PersistedViewport = Required<Pick<ViewportProps, PersistedViewportProp>>;
