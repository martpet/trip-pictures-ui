import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';
import { PhotoExifData, Upload, UploadContext } from '~/lazy/upload';
import {
  useCreatePhotosMutation,
  useCreatePresignedUploadUrlsMutation,
} from '~/services';
import { loadingFinished, loadingStarted } from '~/slices';

export const useS3Upload = () => {
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
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [createPhotosMutation] = useCreatePhotosMutation();

  const createPhotos = async () => {
    const requestBody = completedUploads.map((upload) => ({
      ...(upload.exif as NonNullable<PhotoExifData>),
      s3uuid: upload.s3uuid!,
    }));
    const toastMsg = formatMessage(
      { id: 'upload.toast.completed' },
      { successCount: completedUploads.length }
    );
    dispatch(loadingStarted());
    const photos = await createPhotosMutation(requestBody).unwrap();
    dispatch(loadingFinished());
    console.log(photos);
    navigate(paths.home);
    toast.success(toastMsg);
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
    const progressTick: Record<Upload['id'], number> = {};
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

  return { startUpload };
};
