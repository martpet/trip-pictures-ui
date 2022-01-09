import { Grid, View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Loader, Toolbar } from '~/components';
import { barArea, mainArea } from '~/consts';
import { useToolbarPosition } from '~/hooks';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const barOnTop = useToolbarPosition() === 'top';
  const barSize = '48px';
  const mainAreaSize = '1fr';
  const contenSizes = [barSize, mainAreaSize];

  return (
    <>
      <Loader />
      <Toaster />
      <Grid
        height="100vh"
        areas={barOnTop ? [barArea, mainArea] : [`${barArea} ${mainArea}`]}
        columns={barOnTop ? ['1fr'] : contenSizes}
        rows={barOnTop ? contenSizes : ['1fr']}
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
