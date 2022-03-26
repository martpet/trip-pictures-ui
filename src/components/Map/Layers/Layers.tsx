import { memo } from 'react';
import { Layer, Source } from 'react-map-gl';

import { photosLayer, usePhotosSource } from '~/components';

export const Layers = memo(() => {
  const photosSource = usePhotosSource();

  return (
    <Source {...photosSource}>
      <Layer {...photosLayer} />
    </Source>
  );
});
