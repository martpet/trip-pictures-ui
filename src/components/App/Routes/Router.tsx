import { Route, Routes } from 'react-router-dom';

import { MapView, NotFound, Upload } from '~/components';
import { paths } from '~/consts';

export function Router() {
  return (
    <Routes>
      <Route path={paths.home} element={<MapView />} />
      <Route path={paths.upload} element={<Upload />} />
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  );
}
