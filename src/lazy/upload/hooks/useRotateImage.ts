import {
  OrientationCode,
  readOrientationCode,
  updateOrientationCode,
} from '@ginpei/exif-orientation';

import { Upload } from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  editUpload(id: string, patch: Partial<Upload>): void;
};

export const useRotateImage = ({ uploads, editUpload }: Arg) => {
  return async (uploadId: string) => {
    const upload = uploads.find(({ id }) => id === uploadId)!;
    const { file } = upload;
    const buffer = await file.arrayBuffer();
    const orientation = await readOrientationCode(buffer);
    const newOrientation = getNextOrientation(orientation);
    await updateOrientationCode(buffer, newOrientation);
    const newFile = new File([buffer], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });
    editUpload(uploadId, { file: newFile });
  };
};

function getNextOrientation(currentOrientation: OrientationCode) {
  const orientations = [
    OrientationCode.deg270,
    OrientationCode.deg180,
    OrientationCode.deg90,
    OrientationCode.original,
  ];
  const currentIndex = orientations.indexOf(currentOrientation);
  const nextIndex = (currentIndex + 1) % orientations.length;
  return orientations[nextIndex];
}
