import { Dispatch, SetStateAction } from 'react';

import {
  addImageData,
  allowedFileTypes,
  getNonDuplicateFiles,
} from '~/components/Upload';
import { Upload } from '~/types';

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
        const upload: Upload = { file, data: {}, errors: [] };
        if (!allowedFileTypes.includes(file.type)) {
          upload.errors.push('fileType');
        }
        return addImageData(upload);
      })
    );

    if (newUploads.length) {
      setUploads([...uploads, ...newUploads]);
    }
  };

  const removeUpload = (i: number) => {
    const newUploads = [...uploads];
    newUploads.splice(i, 1);
    setUploads(newUploads);
  };

  return { addUploads, removeUpload };
};
