import { Grid, View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { AppLoader, Toolbar } from '~/components';
import { barArea, mainArea } from '~/consts';
import { useIsTopToolbar } from '~/hooks';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const topBar = useIsTopToolbar();
  const barSize = topBar ? '58px' : '52px';
  const mainAreaSize = '1fr';
  const contenSizes = [barSize, mainAreaSize];

  return (
    <>
      <AppLoader />
      <Toaster />

      <Grid
        height="100vh"
        areas={topBar ? [barArea, mainArea] : [`${barArea} ${mainArea}`]}
        columns={topBar ? ['1fr'] : contenSizes}
        rows={topBar ? contenSizes : ['1fr']}
      >
        <View gridArea={barArea} elementType="header">
          <Toolbar />
        </View>
        <View gridArea={mainArea} elementType="main">
          {children}
        </View>
      </Grid>
    </>
  );
}
