import { useMemo } from 'react';

import { Upload } from '~/lazyload/upload';

type Arg = {
  uploads: Upload[];
};

export const useFilteredUploads = ({ uploads }: Arg) =>
  useMemo(() => {
    const validUploads: Upload[] = [];
    const invalidUploads: Upload[] = [];
    const completedUploads: Upload[] = [];
    const failedUploads: Upload[] = [];

    uploads.forEach((upload: Upload) => {
      if (upload.validityErrors.length) {
        invalidUploads.push(upload);
      } else {
        validUploads.push(upload);
      }

      if (upload.isComplete) {
        completedUploads.push(upload);
      } else if (upload.isFailed) {
        failedUploads.push(upload);
      }
    });

    return {
      validUploads,
      invalidUploads,
      completedUploads,
      failedUploads,
    };
  }, [uploads]);
