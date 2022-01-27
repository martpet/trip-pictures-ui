import { Dispatch, SetStateAction } from 'react';

import { splitDuplicateFiles } from '~/components/Upload';

type UseAddFilesProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const useAddFiles = ({ files, setFiles }: UseAddFilesProps) => {
  return (newFiles: FileList) => {
    const { nonDuplicates } = splitDuplicateFiles({
      oldFiles: files,
      newFiles: Array.from(newFiles),
    });

    if (nonDuplicates) {
      setFiles([...files, ...nonDuplicates]);
    }
  };
};
