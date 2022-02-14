import { useLayoutEffect, useState } from 'react';

import { isMobileSafari } from '~/consts';

export const useIOSAddressbarHeight = () => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!isMobileSafari) return undefined;

    const apply = () => setHeight(document.body.offsetHeight - window.innerHeight);
    apply();
    window.addEventListener('resize', apply);

    return () => {
      window.removeEventListener('resize', apply);
    };
  }, []);

  return height;
};
