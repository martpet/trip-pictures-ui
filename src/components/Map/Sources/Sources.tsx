import { memo } from 'react';

import { PhotosLayer, PhotosSource } from '~/components';

function Sources() {
  return (
    <PhotosSource>
      <PhotosLayer />
    </PhotosSource>
  );
}

const Memoized = memo(Sources);
export { Memoized as Sources };
