import { useContext, useEffect, useRef } from 'react';
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

export const useMakeUpload = () => {
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
  const uploadsProgresses = useRef<Record<Upload['id'], number>>({});
  const progressInterval = 500;
  const lastProgressTick = useRef(Date.now());

  const trackProgress =
    (uploadId: Upload['id']) =>
    ({ loaded, total }: XMLHttpRequestEventTargetEventMap['progress']) => {
      uploadsProgresses.current[uploadId] = (loaded / total) * 100;
      const tick = Date.now();
      if (tick - progressInterval > lastProgressTick.current) {
        lastProgressTick.current = tick;
        Object.entries(uploadsProgresses.current).forEach(([id, progress]) => {
          editUpload(id, { progress });
        });
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
