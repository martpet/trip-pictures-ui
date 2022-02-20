import { View } from '@adobe/react-spectrum';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { LoadingOverlay, Theme } from '~/components';
import { selectIsAppLoading } from '~/slices';

export function AppLoader() {
  const isLoading = useSelector(selectIsAppLoading);
  const containerNode = document.getElementById('loader')!;

  if (!isLoading) return null;

  const element = (
    <View
      position="fixed"
      left="static-size-0"
      top="static-size-0"
      width="100vw"
      height="100vh"
      zIndex={9999}
    >
      <LoadingOverlay />
    </View>
  );

  return createPortal(<Theme>{element}</Theme>, containerNode);
}
