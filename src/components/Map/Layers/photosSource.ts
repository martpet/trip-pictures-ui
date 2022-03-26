import { useMemo } from 'react';
import { SourceProps } from 'react-map-gl';

import { useGetPhotosQuery } from '~/services';

export const usePhotosSource = () => {
  const { data: photos } = useGetPhotosQuery();

  return useMemo<SourceProps>(
    () => ({
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: (photos || []).map(({ longitude, latitude }) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          properties: {},
        })),
      },
    }),
    [photos]
  );
};
