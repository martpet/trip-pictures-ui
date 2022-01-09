import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { MapView, NotFound, Upload } from '~/components';
import { appPaths } from '~/consts';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<MapView />} />
      <Route path={appPaths.upload} element={<Upload />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
}
