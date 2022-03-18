import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useState } from 'react';
import ReactMapGL, { MapEvent } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { mapInnerContainerId, persistedViewportProps } from '~/consts';
import { useDebounce } from '~/hooks';
import { selectColorScheme, selectMapViewport, viewportChanged } from '~/slices';
import { PersistedViewport } from '~/types';
import { setViewportInUrl } from '~/utils';

type Props = {
  children: ReactNode;
};

export function MapGL({ children }: Props) {
  const persistedViewport = useSelector(selectMapViewport);
  const [viewport, setViewport] = useState(persistedViewport);
  const debouncedViewport = useDebounce(viewport);
  const colorScheme = useSelector(selectColorScheme);
  const dispatch = useDispatch();

  const handleDoubleClick = (e: MapEvent) => {
    if (e.target.id !== mapInnerContainerId) e.stopImmediatePropagation();
  };

  const persistViewport = () => {
    if (!viewport) return;
    const newPersisted = {} as PersistedViewport;
    persistedViewportProps.forEach((prop) => {
      newPersisted[prop] = viewport[prop];
    });
    const isChanged = JSON.stringify(newPersisted) !== JSON.stringify(persistedViewport);
    if (isChanged) dispatch(viewportChanged(newPersisted));
  };

  useEffect(() => {
    persistViewport();
    setViewportInUrl(viewport);
  }, [debouncedViewport]);

  if (!colorScheme) return null;

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      onDblClick={handleDoubleClick}
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle={`mapbox://styles/mapbox/${colorScheme}-v10`}
      attributionControl={false}
      width="100%"
      height="100%"
    >
      {children}
    </ReactMapGL>
  );
}
