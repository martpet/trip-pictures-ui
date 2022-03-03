import { useContext } from 'react';

import { Upload, UploadContext, useS3UploadDone } from '~/lazy/upload';
import { useCreatePresignedUploadUrlsMutation } from '~/services';

export const useUploadToS3 = () => {
  const [createUploadUrls] = useCreatePresignedUploadUrlsMutation();
  const { validUploads, editUpload } = useContext(UploadContext);

  useS3UploadDone();

  return async () => {
    const presignedUploads = await createUploadUrls({
      uploadsLength: validUploads.length,
    }).unwrap();
    const progressTick: Record<Upload['id'], number> = {};

    validUploads.forEach(({ id, file }, i) => {
      const { presignedPost, s3uuid } = presignedUploads[i];
      const { fields, url } = presignedPost;
      const request = new XMLHttpRequest();
      const formData = new FormData();

      editUpload(id, { isStarted: true, s3uuid });

      Object.entries(fields).forEach((field) => formData.append(...field));
      formData.append('file', file);

      request.upload.addEventListener('load', () => {
        editUpload(id, { isComplete: true });
      });

      request.upload.addEventListener('error', () => {
        editUpload(id, { isFailed: true });
      });

      request.upload.addEventListener('progress', ({ loaded, total }) => {
        const tick = +new Date();
        const lastTick = progressTick[id];
        const progress = (loaded / total) * 100;

        if (!lastTick) {
          progressTick[id] = tick;
        } else if (tick - lastTick > 1000 || progress === 100) {
          editUpload(id, { progress });
          progressTick[id] = tick;
        }
      });

      request.open('POST', url);
      request.send(formData);
    });
  };
};
