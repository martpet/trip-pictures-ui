import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';
import { UploadContext } from '~/lazy/upload';

export const useS3UploadDone = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const {
    isUploadDone,
    completedUploads,
    failedUploads,
    setFailedUploadsDialogOpen,
    closeUploadDialog,
  } = useContext(UploadContext);

  useEffect(() => {
    if (!isUploadDone) return;

    if (completedUploads.length) {
      const successMsg = formatMessage(
        { id: 'upload.toast.completed' },
        { count: completedUploads.length }
      );
      toast.success(successMsg);
      navigate(paths.home);
    }

    if (failedUploads.length) {
      setFailedUploadsDialogOpen(true);
    } else {
      closeUploadDialog();
    }
  }, [isUploadDone]);
};
