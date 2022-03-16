import { Upload } from '~/lazyload/upload';

type Arg = {
  uploads: Upload[];
  newUploads: Upload[];
};

export const getNonDuplicateNewUploads = ({ uploads, newUploads }: Arg) => {
  const nonDuplicate: Upload[] = [];

  newUploads.forEach((newUpload) => {
    const isDuplicate = uploads.some(
      (upload) =>
        upload.file.size === newUpload.file.size &&
        upload.exif.dateOriginal === newUpload.exif.dateOriginal
    );
    if (!isDuplicate) {
      nonDuplicate.push(newUpload);
    }
  });

  return nonDuplicate;
};
