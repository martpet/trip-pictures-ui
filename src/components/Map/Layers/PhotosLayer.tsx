import { memo, useMemo } from 'react';
import { Layer, LayerProps } from 'react-map-gl';

type PhotosLayerProps = {
  source?: string;
};

function PhotosLayer({ source }: PhotosLayerProps) {
  const layerProps = useMemo<LayerProps>(
    () => ({
      type: 'symbol',
      layout: {
        'text-field': '☺️',
        'text-size': 50,
      },
      paint: {
        'text-color': 'red',
      },
    }),
    []
  );

  return <Layer source={source} {...layerProps} />;
}

const Memoized = memo(PhotosLayer);
export { Memoized as PhotosLayer };
