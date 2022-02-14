import heic2any from 'heic2any';

import { Upload } from '~/lazy/upload';

type Arg = {
  upload: Upload;
};

export const convertHeicToJpeg = async ({ upload }: Arg) => {
  const blob = (await heic2any({ blob: upload.file, toType: 'image/jpeg' })) as Blob;

  const file = new File([blob], upload.file.name, {
    lastModified: upload.file.lastModified,
  });

  return { ...upload, file };
};
