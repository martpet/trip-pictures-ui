import { CircleLayer } from 'react-map-gl';

export const photosLayer: CircleLayer = {
  id: 'photos',
  type: 'circle',
  paint: {
    'circle-color': '#5aa9fa',
    'circle-radius': 6,
  },
};
