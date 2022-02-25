import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { UploadContext } from '~/components/lazy/upload';
import { paths } from '~/consts';

export const useUploadDone = () => {
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

    navigate(paths.home);

    if (completedUploads.length) {
      toast.success(
        formatMessage(
          { id: 'upload.toast.completed' },
          { count: completedUploads.length }
        )
      );
    }

    if (failedUploads.length) {
      setFailedUploadsDialogOpen(true);
    } else {
      closeUploadDialog();
    }
  }, [isUploadDone]);
};
