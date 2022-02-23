import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UploadContext } from '~/components/lazy/upload';
import { paths } from '~/consts';

export const useHandleUploadComplete = () => {
  const { closeDialog, isUploadComplete } = useContext(UploadContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUploadComplete) {
      navigate(paths.home);
      closeDialog();
    }
  }, [isUploadComplete]);
};
