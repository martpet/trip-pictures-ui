import { strapiApiPaths } from '~/consts';
import { PresignedUrl, Upload } from '~/lazyload/upload';
import { strapiApi } from '~/services';
import { Photo } from '~/types';

type CreatePresignedUploadUrlRequest = Array<Pick<Upload, 'id' | 'exif'>>;
type CreatePhotosRequest = Array<Pick<Upload, 's3uuid' | 'exif' | 'duplicatePhotoId'>>;

const uploadApi = strapiApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    createPresignedUploadUrls: mutation<PresignedUrl[], CreatePresignedUploadUrlRequest>({
      query: (body) => ({
        url: strapiApiPaths.presignedPhotoUploadUrls,
        method: 'POST',
        body,
      }),
    }),
    createPhotos: mutation<Photo[], CreatePhotosRequest>({
      query: (body) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Photo'],
    }),
  }),
});

export const { useCreatePresignedUploadUrlsMutation, useCreatePhotosMutation } =
  uploadApi;
