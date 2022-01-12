import { useMediaQuery } from '@react-spectrum/utils';

import { breakpoints } from '~/consts';
import { BreakpointName } from '~/types';

export const useMatchScreenWidth = (label: BreakpointName) => {
  return useMediaQuery(`(max-width: ${breakpoints[label]}px)`);
};
