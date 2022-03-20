import { FeatureCollection, Point } from 'geojson';
import { ReactNode, useMemo } from 'react';
import { Source } from 'react-map-gl';

import { useGetPhotosQuery } from '~/services';

type PhotosSourceProps = {
  children: ReactNode;
};

export function PhotosSource({ children }: PhotosSourceProps) {
  const { data: photos } = useGetPhotosQuery();

  const geojson = useMemo<FeatureCollection<Point>>(
    () => ({
      type: 'FeatureCollection',
      features: (photos || []).map(({ longitude, latitude }) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties: {},
      })),
    }),
    [photos]
  );

  return (
    <Source type="geojson" data={geojson}>
      {children}
    </Source>
  );
}
