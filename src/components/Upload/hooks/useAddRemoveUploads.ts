import * as ExifReader from 'exifreader';
import { Dispatch, SetStateAction } from 'react';

import { getNonDuplicateFiles } from '~/components/Upload';
import { Upload } from '~/types';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useAddRemoveUploads = ({ uploads, setUploads }: Arg) => {
  const addUploads = async (selectedFiles: FileList) => {
    const newFiles = getNonDuplicateFiles({
      currentFiles: uploads.map(({ file }) => file),
      newFiles: Array.from(selectedFiles),
    });

    const buffer = await newFiles[0].arrayBuffer();
    const tags = ExifReader.load(buffer);
    console.log(tags);

    if (newFiles.length) {
      const newUploads = newFiles.map((file) => ({ file }));
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
