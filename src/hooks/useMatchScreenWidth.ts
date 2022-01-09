import { useMediaQuery } from '@react-spectrum/utils';

import { breakpoints } from '~/consts';
import { BreakpointLabel } from '~/types';

export const useMatchScreenWidth = () => {
  const query = (name: BreakpointLabel) => `(max-width: ${breakpoints[name]}px)`;
  const matches: Record<BreakpointLabel, boolean> = {
    S: useMediaQuery(query('S')),
    M: useMediaQuery(query('M')),
    L: useMediaQuery(query('L')),
    XL: useMediaQuery(query('XL')),
    XXL: useMediaQuery(query('XXL')),
  };

  return (label: BreakpointLabel) => matches[label];
};
