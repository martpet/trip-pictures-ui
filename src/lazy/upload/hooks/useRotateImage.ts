import {
  OrientationCode,
  readOrientationCode,
  updateOrientationCode,
} from '@ginpei/exif-orientation';
import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useRotateImage = ({ uploads, setUploads }: Arg) => {
  return async (index: number) => {
    const upload = uploads[index];
    const { file } = upload;
    const buffer = await file.arrayBuffer();
    const orientation = await readOrientationCode(buffer);
    const newOrientation = getNextOrientation(orientation);
    await updateOrientationCode(buffer, newOrientation);
    const newFile = new File([buffer], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });
    const newUpload = { ...upload, file: newFile };
    const updatedUploads = [...uploads];
    updatedUploads.splice(index, 1, newUpload);
    setUploads(updatedUploads);
  };
};

function getNextOrientation(currentOrientation: OrientationCode) {
  const orientations = [
    OrientationCode.deg90,
    OrientationCode.deg180,
    OrientationCode.deg270,
    OrientationCode.original,
  ];
  const currentIndex = orientations.indexOf(currentOrientation);
  const nextIndex = (currentIndex + 1) % orientations.length;
  return orientations[nextIndex];
}
