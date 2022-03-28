import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactMapGL, { MapRef } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { Layers } from '~/components';
import { useDebounce } from '~/hooks';
import {
  selectColorScheme,
  selectToolbarPosition,
  selectViewState,
  viewStateChanged,
} from '~/slices';
import { setViewStateInUrl } from '~/utils';

type Props = {
  children: ReactNode;
};

export function MapGL({ children }: Props) {
  const dispatch = useDispatch();
  const storedViewState = useSelector(selectViewState);
  const [viewState, setViewState] = useState(storedViewState);
  const debouncedViewState = useDebounce(viewState);
  const colorScheme = useSelector(selectColorScheme);
  const toolbarPosition = useSelector(selectToolbarPosition);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (viewState) {
      dispatch(viewStateChanged(viewState));
      setViewStateInUrl(viewState);
    }
  }, [debouncedViewState]);

  useEffect(() => {
    mapRef.current?.resize();
  }, [toolbarPosition]);

  if (!colorScheme) return null;

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewState}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle={`mapbox://styles/mapbox/${colorScheme}-v10`}
      attributionControl={false}
      onMove={(evt) => setViewState(evt.viewState)}
      reuseMaps
      maxPitch={85}
    >
      <>
        {children}
        <Layers />
      </>
    </ReactMapGL>
  );
}
