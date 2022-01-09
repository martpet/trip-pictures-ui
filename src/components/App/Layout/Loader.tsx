import { useSelector } from 'react-redux';

import { LoadingOverlay } from '~/components';
import { selectIsAppLoading } from '~/slices';

export function Loader() {
  const isLoading = useSelector(selectIsAppLoading);
  return !isLoading ? null : <LoadingOverlay />;
}
