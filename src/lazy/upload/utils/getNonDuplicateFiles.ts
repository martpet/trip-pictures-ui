type Arg = {
  currentFiles: File[];
  addedFiles: File[];
};

export const getNonDuplicateFiles = ({ currentFiles, addedFiles }: Arg) => {
  const nonDuplicateFiles: File[] = [];

  addedFiles.forEach((newFile) => {
    const isDuplicate = currentFiles.some(
      // TODO: check some exif properties instead
      (currentFile) => currentFile.size === newFile.size
    );
    if (!isDuplicate) {
      nonDuplicateFiles.push(newFile);
    }
  });

  return nonDuplicateFiles;
};
