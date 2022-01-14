import { useSelector } from 'react-redux';

import { useIsToolbarInMobileMode } from '~/hooks';
import { selectToolbarPosition } from '~/slices';

export const useIsTopToolbar = () => {
  const isToolbarInMobileMode = useIsToolbarInMobileMode();
  const preferredPosition = useSelector(selectToolbarPosition);
  const position = isToolbarInMobileMode ? 'top' : preferredPosition;

  return position === 'top';
};
