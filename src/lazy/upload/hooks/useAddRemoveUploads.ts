import { Dispatch, SetStateAction } from 'react';

import {
  acceptedMimeTypes,
  addExifData,
  getNonDuplicateNewUploads,
  Upload,
} from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useAddRemoveUploads = ({ uploads, setUploads }: Arg) => {
  const addUploads = async (selectedFiles: FileList) => {
    const files = Array.from(selectedFiles);

    let newUploads = await Promise.all(
      files.map(async (file) => {
        let upload: Upload = { file, exif: {}, errors: [] };
        if (acceptedMimeTypes.includes(file.type)) {
          upload = await addExifData(upload);
        } else {
          upload.errors.push('fileTypeWrong');
        }
        return upload;
      })
    );

    newUploads = getNonDuplicateNewUploads({ uploads, newUploads });

    if (newUploads.length) {
      setUploads([...newUploads, ...uploads]);
    }
  };

  const removeUpload = (i: number) => {
    const newUploads = [...uploads];
    newUploads.splice(i, 1);
    setUploads(newUploads);
  };

  return { addUploads, removeUpload };
};
