import { useIsMobile } from '~/hooks';

export const useIsToolbarInMobileMode = () => {
  const isMobile = useIsMobile();
  return isMobile;
};
