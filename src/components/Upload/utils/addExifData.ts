import ExifReader from 'exifreader';

import { Upload, UploadExifData } from '~/types';

export const addExifData = async (upload: Upload) => {
  const newUpload = { ...upload };
  const arrayBuffer = await newUpload.file.arrayBuffer();
  const { exif, gps } = ExifReader.load(arrayBuffer, { expanded: true });

  type Data = {
    key: keyof UploadExifData;
    value?: number;
    decimalPlaces: number;
  };

  const data: Data[] = [
    {
      key: 'latitude',
      value: gps?.Latitude,
      decimalPlaces: 4,
    },
    {
      key: 'longitude',
      value: gps?.Longitude,
      decimalPlaces: 4,
    },
    {
      key: 'altitude',
      value: gps?.Altitude,
      decimalPlaces: 0,
    },
    {
      key: 'bearing',
      value: Number(exif?.GPSDestBearing?.description),
      decimalPlaces: 0,
    },
  ];

  data.forEach(({ key, value, decimalPlaces }) => {
    if (value) {
      newUpload.data[key] = Number(value.toFixed(decimalPlaces));
    } else {
      upload.missingData.push(key);
    }
  });

  return newUpload;
};
