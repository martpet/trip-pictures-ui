import { useMediaQuery } from '@react-spectrum/utils';

import { breakpoints } from '~/consts';
import { BreakpointLabel } from '~/types';

export const useMatchScreenWidth = (label: BreakpointLabel) => {
  return useMediaQuery(`(max-width: ${breakpoints[label]}px)`);
};
