import { ViewportProps } from 'react-map-gl';

import { PersistedViewportKey } from '~/types/PersistedViewportKey';

export type PersistedViewport = Required<Pick<ViewportProps, PersistedViewportKey>>;
