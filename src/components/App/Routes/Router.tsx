import { Route, Routes } from 'react-router-dom';

import { MapView, NotFound } from '~/components';
import { paths } from '~/consts';

export function Router() {
  return (
    <Routes>
      <Route path={paths.viewport} element={<MapView />} />
      <Route path={paths.home} element={<MapView />} />
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  );
}
