import { useMediaQuery } from '@react-spectrum/utils';

export const useIsMobile = () => {
  const spectrumsIsMobileSize = 700;
  return useMediaQuery(`(max-width: ${spectrumsIsMobileSize}px)`);
};
