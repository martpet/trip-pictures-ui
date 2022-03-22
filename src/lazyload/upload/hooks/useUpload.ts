import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';
import {
  Upload,
  UploadContext,
  useCreatePhotosMutation,
  useCreatePresignedUploadUrlsMutation,
} from '~/lazyload/upload';

export const useUpload = () => {
  const [createPresignedUrls] = useCreatePresignedUploadUrlsMutation();
  const [createPhotosMutation] = useCreatePhotosMutation();
  const {
    validUploads,
    completedUploads,
    failedUploads,
    editUpload,
    isUploadDone,
    closeUploadDialog,
    setFailedUploadsDialogOpen,
  } = useContext(UploadContext);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const progressTicks: Record<Upload['id'], number> = {};
  const progressTickInterval = 100;

  const createPhotos = async () => {
    const request = completedUploads.map(({ s3uuid, exif, duplicatePhotoId }) => ({
      s3uuid,
      exif,
      duplicatePhotoId,
    }));
    await createPhotosMutation(request).unwrap();
    const successMsg = formatMessage(
      { id: 'upload.toast.completed' },
      { successCount: completedUploads.length }
    );
    navigate(paths.home);
    toast.success(successMsg);
  };

  const trackProgress =
    (id: Upload['id']) =>
    ({ loaded, total }: { loaded: number; total: number }) => {
      const progress = (loaded / total) * 100;
      const tick = +new Date();
      const lastTick = progressTicks[id];
      const isTickTime =
        !lastTick || progress === 100 || tick - lastTick > progressTickInterval;
      if (isTickTime) {
        progressTicks[id] = tick;
        editUpload(id, { progress });
      }
    };

  const startUpload = async () => {
    const preSignedUrlsRequestBody = validUploads.map(({ id, exif }) => ({ id, exif }));
    const presignedUrls = await createPresignedUrls(preSignedUrlsRequestBody).unwrap();
    presignedUrls.forEach(({ url, fields, uploadId, s3uuid, duplicatePhotoId }) => {
      if (duplicatePhotoId !== undefined) {
        editUpload(uploadId, {
          duplicatePhotoId,
          isComplete: true,
          progress: 100,
        });
        return;
      }
      const upload = validUploads.find(({ id }) => id === uploadId)!;
      const request = new XMLHttpRequest();
      const formData = new FormData();
      const { file } = upload;
      editUpload(uploadId, { s3uuid, isStarted: true });
      Object.entries(fields).forEach((field) => formData.append(...field));
      formData.append('file', file);
      request.upload.addEventListener('load', () => {
        editUpload(uploadId, { isComplete: true });
      });
      request.upload.addEventListener('error', () => {
        editUpload(uploadId, { isFailed: true });
      });
      request.upload.addEventListener('progress', trackProgress(uploadId));
      request.open('POST', url);
      request.send(formData);
    });
  };

  useEffect(() => {
    if (!isUploadDone) return;
    if (completedUploads.length) createPhotos();
    if (failedUploads.length) {
      setFailedUploadsDialogOpen(true);
    } else {
      closeUploadDialog();
    }
  }, [isUploadDone]);

  return { startUpload };
};
