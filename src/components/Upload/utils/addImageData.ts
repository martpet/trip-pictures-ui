import ExifReader from 'exifreader';

import { Upload } from '~/types';

export const addImageData = async (upload: Upload) => {
  const newUpload = { ...upload };
  const arrayBuffer = await newUpload.file.arrayBuffer();
  let tags;

  try {
    tags = ExifReader.load(arrayBuffer, { expanded: true });
  } catch (e) {
    upload.errors.push('exif');
    return upload;
  }

  const { exif, gps } = tags;

  type Entry = {
    key: keyof Upload['data'];
    value?: number;
    decimalPlaces?: number;
    isRequired?: boolean;
  };

  const entries: Entry[] = [
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

  entries.forEach(({ key, value, decimalPlaces }) => {
    if (value) {
      let formattedValue;
      if (decimalPlaces !== undefined) {
        formattedValue = Number(value.toFixed(decimalPlaces));
      }
      newUpload.data[key] = formattedValue;
    }
  });

  const { latitude, longitude, altitude } = newUpload.data;
  if (!latitude || !longitude || !altitude) {
    newUpload.errors.push('coords');
  }

  return newUpload;
};
