import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import { UploadContext } from '~/components/lazy/upload';

export const useHandleUploadDone = () => {
  const {
    isUploadDone,
    completedUploads,
    failedUploads,
    showPhotosOnMap,
    setFailedUploadsDialogOpen,
  } = useContext(UploadContext);

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!isUploadDone) return;

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
      showPhotosOnMap();
    }
  }, [isUploadDone]);
};
