import { Grid, View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

import { AppLoader, Toaster, Toolbar } from '~/components';
import { barArea, mainArea } from '~/consts';
import { useIsTopToolbar } from '~/hooks';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const topBar = useIsTopToolbar();
  const contentSizes = [topBar ? '58px' : '52px', '1fr'];

  return (
    <>
      <AppLoader />
      <Toaster />

      <Grid
        height="100vh"
        areas={topBar ? [barArea, mainArea] : [`${barArea} ${mainArea}`]}
        columns={topBar ? ['1fr'] : contentSizes}
        rows={topBar ? contentSizes : ['1fr']}
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
