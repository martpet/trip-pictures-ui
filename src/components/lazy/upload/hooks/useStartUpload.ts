import { useContext } from 'react';

import { Upload, UploadContext } from '~/components/lazy/upload';
import { useCreatePresignedPhotoUploadUrlsMutation } from '~/services';

export const useStartUpload = () => {
  const [createUploadUrls] = useCreatePresignedPhotoUploadUrlsMutation();
  const { validUploads, editUpload } = useContext(UploadContext);

  return async () => {
    const uploadUrls = await createUploadUrls({
      uploadsLength: validUploads.length,
    }).unwrap();

    const progressTick: Record<Upload['id'], number> = {};

    validUploads.forEach((upload) => {
      const { url, fields } = uploadUrls[0];
      const formData = new FormData();
      const request = new XMLHttpRequest();

      Object.entries(fields).forEach((field) => formData.append(...field));
      formData.append('file', upload.file);

      request.upload.addEventListener('load', () => {
        editUpload(upload.id, { isComplete: true });
      });

      request.upload.addEventListener('error', () => {
        editUpload(upload.id, { isFailed: true });
      });

      request.upload.addEventListener('progress', ({ loaded, total }) => {
        const lastTick = progressTick[upload.id];
        const thisTick = +new Date();
        if (!lastTick) {
          progressTick[upload.id] = thisTick;
        } else if (thisTick - lastTick > 1000) {
          const progress = (loaded / total) * 100;
          editUpload(upload.id, { progress });
          progressTick[upload.id] = thisTick;
        }
      });

      request.open('POST', url);
      request.send(formData);
      editUpload(upload.id, { isStarted: true });
    });
  };
};
