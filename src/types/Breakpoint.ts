import { breakpoints } from '~/consts';
import { BreakpointLabel } from '~/types/BreakpointLabel';

export type Breakpoint = typeof breakpoints[BreakpointLabel];
