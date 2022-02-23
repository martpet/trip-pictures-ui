import { useContext } from 'react';

import { UploadContext } from '~/lazy/upload';
import { useCreatePresignedPhotoUploadUrlsMutation } from '~/services';

export const useStartUpload = () => {
  const [createUploadUrls] = useCreatePresignedPhotoUploadUrlsMutation();
  const { validUploads, editUpload } = useContext(UploadContext);

  return async () => {
    const uploadUrls = await createUploadUrls({
      uploadsLength: validUploads.length,
    }).unwrap();

    validUploads.forEach((upload) => {
      const { url, fields } = uploadUrls[0];
      const formData = new FormData();
      const request = new XMLHttpRequest();

      Object.entries(fields).forEach((field) => formData.append(...field));
      formData.append('file', upload.file);
      request.upload.addEventListener('load', () => {
        editUpload(upload.id, { isComplete: true });
      });
      request.open('POST', url);
      request.send(formData);
      editUpload(upload.id, { isStarted: true });
    });
  };
};
