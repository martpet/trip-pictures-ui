import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useState } from 'react';
import MapGL, { MapEvent } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { mapboxTokenProd, mapInnerContainerId } from '~/consts';
import { useDebounce } from '~/hooks';
import { mapDataChanged, selectDeviceColorMode, selectMapData } from '~/slices';

type MapProps = {
  children: ReactNode;
};

export function Map({ children }: MapProps) {
  const dispatch = useDispatch();
  const storedMapData = useSelector(selectMapData);
  const [viewport, setViewport] = useState(storedMapData);
  const debouncedViewport = useDebounce(viewport);
  const colorMode = useSelector(selectDeviceColorMode);
  const mapStyle = `mapbox://styles/mapbox/${colorMode}-v10`;
  const devToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const accessToken = import.meta.env.PROD ? mapboxTokenProd : devToken;

  const onDblClick = (e: MapEvent) => {
    if (e.target.id !== mapInnerContainerId) e.stopImmediatePropagation();
  };

  const saveMapData = () => {
    if (!viewport?.width) return;
    const { latitude, longitude, zoom, bearing } = viewport;
    const data = { latitude, longitude, zoom, bearing };
    const isNew = JSON.stringify(data) !== JSON.stringify(storedMapData);
    if (isNew) dispatch(mapDataChanged(data));
  };

  useEffect(() => {
    saveMapData();
  }, [debouncedViewport]);

  return (
    <MapGL
      {...viewport}
      onViewportChange={setViewport}
      onDblClick={onDblClick}
      mapboxApiAccessToken={accessToken}
      mapStyle={mapStyle}
      attributionControl={false}
      width="100%"
      height="100%"
    >
      {children}
    </MapGL>
  );
}
