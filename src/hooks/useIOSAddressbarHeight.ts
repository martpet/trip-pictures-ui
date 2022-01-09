import { useLayoutEffect, useState } from 'react';

export const useIOSAddressbarHeight = () => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!navigator.userAgent.match(/iPhone|iPod|iPad/)) return undefined;

    const applyHeight = () => setHeight(document.body.offsetHeight - window.innerHeight);
    applyHeight();
    window.addEventListener('resize', applyHeight);

    return () => {
      window.removeEventListener('resize', applyHeight);
    };
  }, []);

  return height;
};
