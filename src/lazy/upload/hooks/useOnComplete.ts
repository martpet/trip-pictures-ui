import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';
import { UploadContext } from '~/lazy/upload';

export const useOnComplete = () => {
  const { closeDialog, validUploads } = useContext(UploadContext);
  const navigate = useNavigate();

  const allComplete =
    validUploads.length && validUploads.every(({ isComplete }) => isComplete);

  useEffect(() => {
    if (!allComplete) return;

    navigate(paths.home);
    closeDialog(true);
  }, [allComplete]);
};
