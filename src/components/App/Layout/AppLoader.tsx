import { View } from '@adobe/react-spectrum';
import { useSelector } from 'react-redux';

import { LoadingOverlay } from '~/components';
import { selectIsAppLoading } from '~/slices';

export function AppLoader() {
  const isLoading = useSelector(selectIsAppLoading);

  if (!isLoading) return null;

  return (
    <View position="fixed" left="0" top="0" width="100vw" height="100vh" zIndex={9999}>
      <LoadingOverlay />
    </View>
  );
}
