import ExifReader from 'exifreader';

import { Upload } from '~/lazy/upload';

type Arg = {
  upload: Upload;
};

export const addExifData = async ({ upload }: Arg) => {
  const newUpload = { ...upload };
  const arrayBuffer = await newUpload.file.arrayBuffer();
  let tags;

  try {
    tags = ExifReader.load(arrayBuffer, { expanded: true });
  } catch (e) {
    upload.errors.push('exifUnreadable');
    return upload;
  }

  const { exif, gps } = tags;

  if (gps?.Latitude) {
    newUpload.exif.latitude = Number(gps.Latitude.toFixed(4));
  }

  if (gps?.Longitude) {
    newUpload.exif.longitude = Number(gps.Longitude.toFixed(4));
  }

  if (gps?.Altitude) {
    newUpload.exif.altitude = Number(gps.Altitude.toFixed(0));
  }

  if (exif?.GPSDestBearing?.description) {
    newUpload.exif.bearing = Number(Number(exif.GPSDestBearing.description).toFixed(0));
  }

  if (exif?.DateTimeOriginal?.description) {
    const [date, time] = exif.DateTimeOriginal.description.split(' ');
    newUpload.exif.dateOriginal = `${date.replace(/:/g, '-')}T${time}`;
  }

  const { latitude, longitude, altitude, dateOriginal } = newUpload.exif;

  if (!latitude || !longitude || !altitude) {
    newUpload.errors.push('missingCoords');
  }

  if (!dateOriginal) {
    newUpload.errors.push('missingDate');
  }

  return newUpload;
};
