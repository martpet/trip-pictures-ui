import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useState } from 'react';
import ReactMapGL, { MapEvent } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { Layers } from '~/components';
import { mapInnerContainerId } from '~/consts';
import { useDebounce } from '~/hooks';
import { selectColorScheme, selectPersistedViewport, viewportChanged } from '~/slices';
import { Viewport } from '~/types';
import { setViewportInUrl } from '~/utils';

type Props = {
  children: ReactNode;
};

export function MapGL({ children }: Props) {
  const dispatch = useDispatch();
  const persistedViewport = useSelector(selectPersistedViewport);
  const [viewport, setViewport] = useState<Viewport>(persistedViewport);
  const debouncedViewport = useDebounce(viewport);
  const colorScheme = useSelector(selectColorScheme);

  const preventZoomOnDblClickOutside = (event: MapEvent) => {
    if (event.target.id !== mapInnerContainerId) {
      event.stopImmediatePropagation();
    }
  };

  useEffect(() => {
    dispatch(viewportChanged(viewport));
    setViewportInUrl(viewport);
  }, [debouncedViewport]);

  if (!colorScheme) return null;

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle={`mapbox://styles/mapbox/${colorScheme}-v10`}
      attributionControl={false}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      onDblClick={preventZoomOnDblClickOutside}
    >
      <>
        {children}
        <Layers />
      </>
    </ReactMapGL>
  );
}
