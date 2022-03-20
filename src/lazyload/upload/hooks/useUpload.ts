import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';
import { Upload, UploadContext } from '~/lazyload/upload';
import {
  useCreatePhotosMutation,
  useCreatePresignedUploadUrlsMutation,
} from '~/services';
import { PhotoExifData } from '~/types';

export const useUpload = () => {
  const [createUploadUrls] = useCreatePresignedUploadUrlsMutation();
  const {
    validUploads,
    completedUploads,
    failedUploads,
    editUpload,
    isUploadDone,
    closeUploadDialog,
    setFailedUploadsDialogOpen,
  } = useContext(UploadContext);
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [createPhotosMutation] = useCreatePhotosMutation();

  const createPhotos = async () => {
    const requestBody = completedUploads.map((upload) => ({
      ...(upload.exif as NonNullable<PhotoExifData>),
      s3uuid: upload.s3uuid!,
    }));
    const successMsg = formatMessage(
      { id: 'upload.toast.completed' },
      { successCount: completedUploads.length }
    );
    await createPhotosMutation(requestBody).unwrap();
    navigate(paths.home);
    toast.success(successMsg);
  };

  const handleUploadDone = () => {
    if (completedUploads.length) {
      createPhotos();
    }
    if (failedUploads.length) {
      setFailedUploadsDialogOpen(true);
    } else {
      closeUploadDialog();
    }
  };

  useEffect(() => {
    if (isUploadDone) handleUploadDone();
  }, [isUploadDone]);

  const startUpload = async () => {
    const presignedUploads = await createUploadUrls({
      uploadsLength: validUploads.length,
    }).unwrap();
    const progressTicks: Record<Upload['id'], number> = {};
    validUploads.forEach(({ id, file }, i) => {
      const { presignedPost, s3uuid } = presignedUploads[i];
      const { fields, url } = presignedPost;
      const request = new XMLHttpRequest();
      const formData = new FormData();
      editUpload(id, { isStarted: true, s3uuid });
      Object.entries(fields).forEach((field) => formData.append(...field));
      formData.append('file', file);
      request.upload.addEventListener('load', () => editUpload(id, { isComplete: true }));
      request.upload.addEventListener('error', () => editUpload(id, { isFailed: true }));
      request.upload.addEventListener('progress', ({ loaded, total }) => {
        const tick = +new Date();
        const lastTick = progressTicks[id];
        const progress = (loaded / total) * 100;
        if (!lastTick) {
          progressTicks[id] = tick;
        } else if (tick - lastTick > 100 || progress === 100) {
          editUpload(id, { progress });
          progressTicks[id] = tick;
        }
      });
      request.open('POST', url);
      request.send(formData);
    });
  };
  return { startUpload };
};
