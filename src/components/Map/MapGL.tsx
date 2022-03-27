import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { Layers } from '~/components';
import { useDebounce } from '~/hooks';
import { selectColorScheme, selectViewState, viewStateChanged } from '~/slices';
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

  useEffect(() => {
    if (viewState) {
      dispatch(viewStateChanged(viewState));
      setViewStateInUrl(viewState);
    }
  }, [debouncedViewState]);

  if (!colorScheme) return null;

  return (
    <ReactMapGL
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
