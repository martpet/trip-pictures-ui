type Arg = {
  currentFiles: File[];
  newFiles: File[];
};

export const getNonDuplicateFiles = ({ currentFiles, newFiles }: Arg) => {
  const nonDuplicateFiles: File[] = [];

  newFiles.forEach((newFile) => {
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
