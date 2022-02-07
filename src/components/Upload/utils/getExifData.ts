import * as ExifReader from 'exifreader';

export const getExifData = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const { gps } = ExifReader.load(arrayBuffer, { expanded: true });
  return { gps };
};
