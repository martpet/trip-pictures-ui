import { useContext, useEffect } from 'react';

import { UploadContext } from '~/components/Upload';

export const useEscKeyCloseDialog = () => {
  const { closeDialog } = useContext(UploadContext);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [closeDialog]);
};
