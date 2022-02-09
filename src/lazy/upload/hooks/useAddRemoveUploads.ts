import { Dispatch, SetStateAction } from 'react';

import {
  acceptedMimeTypes,
  addImageData,
  getNonDuplicateFiles,
  Upload,
} from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useAddRemoveUploads = ({ uploads, setUploads }: Arg) => {
  const addUploads = async (selectedFiles: FileList) => {
    const newFiles = getNonDuplicateFiles({
      currentFiles: uploads.map(({ file }) => file),
      addedFiles: Array.from(selectedFiles),
    });

    const newUploads = await Promise.all(
      newFiles.map(async (file) => {
        let upload: Upload = { file, data: {}, errors: [] };
        if (acceptedMimeTypes.includes(file.type)) {
          upload = await addImageData(upload);
        } else {
          upload.errors.push('fileTypeWrong');
        }
        return upload;
      })
    );

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
