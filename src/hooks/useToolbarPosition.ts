import { useSelector } from 'react-redux';

import { useIsToolbarInMobileMode } from '~/hooks';
import { selectToolbarPosition } from '~/slices';
import { ToolbarPosition } from '~/types';

export const useToolbarPosition = (): ToolbarPosition => {
  const isToolbarInMobileMode = useIsToolbarInMobileMode();
  const preferredPosition = useSelector(selectToolbarPosition);

  return isToolbarInMobileMode ? 'top' : preferredPosition;
};
