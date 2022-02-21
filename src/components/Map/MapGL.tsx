import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useState } from 'react';
import ReactMapGL, { MapEvent } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { mapInnerContainerId } from '~/consts';
import { useDebounce } from '~/hooks';
import { mapViewportChanged, selectColorScheme, selectMapViewport } from '~/slices';

type Props = {
  children: ReactNode;
};

export function MapGL({ children }: Props) {
  const dispatch = useDispatch();
  const storedViewport = useSelector(selectMapViewport);
  const [viewport, setViewport] = useState(storedViewport);
  const debouncedViewport = useDebounce(viewport);
  const colorScheme = useSelector(selectColorScheme);

  const handleDoubleClick = (e: MapEvent) => {
    if (e.target.id !== mapInnerContainerId) e.stopImmediatePropagation();
  };

  const storeViewport = () => {
    if (!viewport?.width) return;
    const { latitude, longitude, zoom, bearing } = viewport;
    const data = { latitude, longitude, zoom, bearing };
    const isNew = JSON.stringify(data) !== JSON.stringify(storedViewport);
    if (isNew) dispatch(mapViewportChanged(data));
  };

  useEffect(() => {
    storeViewport();
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
