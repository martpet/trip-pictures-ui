import heic2any from 'heic2any';

import { Upload } from '~/lazyload/upload';

type Arg = {
  upload: Upload;
};

export const convertHeicToJpeg = async ({ upload }: Arg) => {
  const newUpload = { ...upload };

  const newBlob = (await heic2any({
    blob: upload.file,
    toType: 'image/jpeg',
    quality: 0.9,
  })) as Blob;

  newUpload.file = new File([newBlob], upload.file.name, {
    lastModified: upload.file.lastModified,
  });

  return newUpload;
};
