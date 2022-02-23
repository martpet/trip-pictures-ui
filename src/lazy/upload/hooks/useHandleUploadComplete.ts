import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';
import { UploadContext } from '~/lazy/upload';

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
