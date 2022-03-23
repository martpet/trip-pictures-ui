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
    trasferredUploads,
    failedToTransferUploads,
    setUploadStarted,
    editUpload,
    isTransferringDone,
    isUploadDone,
    setUploadDone,
    closeUploadDialog,
    setFailedUploadsDialogOpen,
  } = useContext(UploadContext);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const progressTicks: Record<Upload['id'], number> = {};
  const progressTickInterval = 100;

  const trackProgress =
    (id: Upload['id']) =>
    ({ loaded, total }: { loaded: number; total: number }) => {
      const progress = (loaded / total) * 100;
      const tick = +new Date();
      const lastTick = progressTicks[id];
      const shouldTick = !lastTick || tick - lastTick > progressTickInterval;
      if (shouldTick) {
        progressTicks[id] = tick;
        editUpload(id, { progress });
      }
    };

  const createPhotos = async () => {
    const uploadsCount = trasferredUploads.length;
    const successMsg = formatMessage({ id: 'upload.doneMessage' }, { uploadsCount });
    const requestBody = trasferredUploads.map(({ s3uuid, exif, duplicatePhotoId }) => ({
      s3uuid,
      exif,
      duplicatePhotoId,
    }));
    await createPhotosMutation(requestBody).unwrap();
    setUploadDone(true);
    navigate(paths.home);
    toast.success(successMsg);
  };

  const startUpload = async () => {
    const preSignedUrlsRequestBody = validUploads.map(({ id, exif }) => ({ id, exif }));
    const presignedUrls = await createPresignedUrls(preSignedUrlsRequestBody).unwrap();
    setUploadStarted(true);
    presignedUrls.forEach(({ url, fields, uploadId, s3uuid, duplicatePhotoId }) => {
      if (duplicatePhotoId !== undefined) {
        editUpload(uploadId, { duplicatePhotoId, transferCompleted: true });
        return;
      }
      const upload = validUploads.find(({ id }) => id === uploadId)!;
      const { file } = upload;
      const request = new XMLHttpRequest();
      const formData = new FormData();
      editUpload(uploadId, { s3uuid });
      Object.entries(fields).forEach((field) => formData.append(...field));
      formData.append('file', file);
      request.upload.addEventListener('load', () => {
        editUpload(uploadId, { transferCompleted: true });
      });
      request.upload.addEventListener('error', () => {
        editUpload(uploadId, { transferFailed: true });
      });
      request.upload.addEventListener('progress', trackProgress(uploadId));
      request.open('POST', url);
      request.send(formData);
    });
  };

  useEffect(() => {
    if (isTransferringDone) {
      createPhotos();
    }
  }, [isTransferringDone]);

  useEffect(() => {
    if (!isUploadDone) return;
    if (failedToTransferUploads.length) {
      setFailedUploadsDialogOpen(true);
    } else {
      closeUploadDialog();
    }
  }, [isUploadDone]);

  return { startUpload };
};
