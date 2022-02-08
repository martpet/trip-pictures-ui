import { Dispatch, SetStateAction } from 'react';

import { addImageData, getNonDuplicateFiles } from '~/components/Upload';
import { Upload } from '~/types';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useAddRemoveUploads = ({ uploads, setUploads }: Arg) => {
  const addUploads = async (selectedFiles: FileList) => {
    const filesToAdd = getNonDuplicateFiles({
      currentFiles: uploads.map(({ file }) => file),
      addedFiles: Array.from(selectedFiles),
    });

    const newUploads = await Promise.all(
      filesToAdd.map(async (file) => {
        let upload: Upload = { file, data: {}, errors: [] };
        upload = await addImageData(upload);
        const { latitude, longitude, altitude } = upload.data;
        if (!latitude || !longitude || !altitude) {
          upload.errors.push('missingCoords');
        }
        if (file.type !== 'image/jpeg') {
          upload.errors.push('fileType');
        }

        return upload;
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
