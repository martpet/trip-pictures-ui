type SplitDuplicateFilesProps = {
  oldFiles: File[];
  newFiles: File[];
};

export const splitDuplicateFiles = ({ oldFiles, newFiles }: SplitDuplicateFilesProps) => {
  const duplicates: File[] = [];
  const nonDuplicates: File[] = [];

  newFiles.forEach((newFile) => {
    const isDuplicate = oldFiles.some(
      (oldFile) =>
        oldFile.lastModified === newFile.lastModified && oldFile.size === newFile.size
    );
    const array = isDuplicate ? duplicates : nonDuplicates;
    array.push(newFile);
  });

  return {
    duplicates,
    nonDuplicates,
  };
};
