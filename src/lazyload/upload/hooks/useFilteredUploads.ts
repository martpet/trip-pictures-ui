import { useMemo } from 'react';

import { Upload } from '~/lazyload/upload';

type Arg = {
  uploads: Upload[];
};

export const useFilteredUploads = ({ uploads }: Arg) =>
  useMemo(() => {
    const validUploads: Upload[] = [];
    const invalidUploads: Upload[] = [];
    const trasferredUploads: Upload[] = [];
    const failedToTransferUploads: Upload[] = [];

    uploads.forEach((upload: Upload) => {
      if (upload.validityErrors.length) {
        invalidUploads.push(upload);
      } else {
        validUploads.push(upload);
      }

      if (upload.transferCompleted) {
        trasferredUploads.push(upload);
      } else if (upload.transferFailed) {
        failedToTransferUploads.push(upload);
      }
    });

    return {
      validUploads,
      invalidUploads,
      trasferredUploads,
      failedToTransferUploads,
    };
  }, [uploads]);
