import { LayerProps } from 'react-map-gl';

export const photosLayer: LayerProps = {
  type: 'circle',
  paint: {
    'circle-color': '#5aa9fa',
    'circle-radius': 6,
  },
};
