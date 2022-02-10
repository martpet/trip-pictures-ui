import ExifReader from 'exifreader';

import { Upload } from '~/lazy/upload';

export const addExifData = async (upload: Upload) => {
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
    newUpload.data.latitude = Number(gps.Latitude.toFixed(4));
  }

  if (gps?.Longitude) {
    newUpload.data.longitude = Number(gps.Longitude.toFixed(4));
  }

  if (gps?.Altitude) {
    newUpload.data.altitude = Number(gps.Altitude.toFixed(0));
  }

  if (exif?.GPSDestBearing?.description) {
    newUpload.data.bearing = Number(Number(exif.GPSDestBearing.description).toFixed(0));
  }

  if (exif?.DateTimeOriginal?.description) {
    const [date, time] = exif.DateTimeOriginal.description.split(' ');
    newUpload.data.created = `${date.replace(':', '-')}T${time}`;
  }

  const { latitude, longitude, altitude, created } = newUpload.data;

  if (!latitude || !longitude || !altitude) {
    newUpload.errors.push('missingCoords');
  }

  if (!created) {
    newUpload.errors.push('missingCreationDate');
  }

  return newUpload;
};
