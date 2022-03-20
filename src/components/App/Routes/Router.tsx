import { Route, Routes } from 'react-router-dom';

import { MainView, NotFound } from '~/components';
import { paths } from '~/consts';

export function Router() {
  return (
    <Routes>
      <Route path={paths.home} element={<MainView />} />
      <Route path={paths.viewport} element={<MainView />} />
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  );
}
