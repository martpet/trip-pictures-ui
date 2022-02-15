import heic2any from 'heic2any';
import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/lazy/upload';

type Arg = {
  upload: Upload;
  setShowLoadingOverlay: Dispatch<SetStateAction<boolean>>;
};

export const convertHeicToJpeg = async ({ upload, setShowLoadingOverlay }: Arg) => {
  setShowLoadingOverlay(true);

  const newBlob = (await heic2any({
    blob: upload.file,
    toType: 'image/jpeg',
    quality: 1,
  })) as Blob;

  const newFile = new File([newBlob], upload.file.name, {
    lastModified: upload.file.lastModified,
  });

  const newUpload = { ...upload, file: newFile };

  setShowLoadingOverlay(false);

  return newUpload;
};
