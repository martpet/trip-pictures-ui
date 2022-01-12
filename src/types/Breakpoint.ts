import { breakpoints } from '~/consts';
import { BreakpointName } from '~/types/BreakpointName';

export type Breakpoint = typeof breakpoints[BreakpointName];
