import { useContext, useEffect } from 'react';

import { UploadContext } from '~/components/lazy/upload';

export const useEscapeKey = () => {
  const { closeUploadDialog } = useContext(UploadContext);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') closeUploadDialog();
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [closeUploadDialog]);
};
