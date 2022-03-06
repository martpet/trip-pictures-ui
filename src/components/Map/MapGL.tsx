import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useState } from 'react';
import ReactMapGL, { MapEvent } from 'react-map-gl';
import { useSelector } from 'react-redux';

import { mapInnerContainerId } from '~/consts';
import { useDebounce } from '~/hooks';
import { selectColorScheme, selectMapViewport } from '~/slices';
import { persistViewport } from '~/utils';

type Props = {
  children: ReactNode;
};

export function MapGL({ children }: Props) {
  const storedViewport = useSelector(selectMapViewport);
  const [viewport, setViewport] = useState(storedViewport);
  const debouncedViewport = useDebounce(viewport);
  const colorScheme = useSelector(selectColorScheme);

  const handleDoubleClick = (e: MapEvent) => {
    if (e.target.id !== mapInnerContainerId) e.stopImmediatePropagation();
  };

  useEffect(() => {
    if (viewport) {
      persistViewport(viewport);
    }
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
