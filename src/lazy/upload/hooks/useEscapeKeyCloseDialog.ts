import { useContext, useEffect } from 'react';

import { UploadContext } from '~/lazy/upload';

export const useEscapeKeyCloseDialog = () => {
  const { closeDialog } = useContext(UploadContext);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [closeDialog]);
};
