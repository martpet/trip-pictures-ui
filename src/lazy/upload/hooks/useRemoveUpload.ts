import { Dispatch, SetStateAction } from 'react';

import { Upload } from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useRemoveUpload =
  ({ uploads, setUploads }: Arg) =>
  (uploadIndex: number) => {
    const newUploads = [...uploads];
    newUploads.splice(uploadIndex, 1);
    setUploads(newUploads);
  };
