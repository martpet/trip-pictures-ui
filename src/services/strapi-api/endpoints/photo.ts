import { strapiApiPaths } from '~/consts';
import { PhotoExifData } from '~/lazyload/upload';
import { strapiApi } from '~/services';
import { Photo } from '~/types';

type CreatePresignedUrlsReq = {
  uploadsLength: number;
};

type CreatePresignedUrlsRes = Array<{
  presignedPost: {
    url: string;
    fields: { [key: string]: string };
  };
  s3uuid: string;
}>;

type CreatePhotosReq = Array<
  PhotoExifData & {
    s3uuid: string;
  }
>;

const photosApiSlice = strapiApi.injectEndpoints({
  endpoints: (build) => ({
    createPresignedUploadUrls: build.mutation<
      CreatePresignedUrlsRes,
      CreatePresignedUrlsReq
    >({
      query: (body) => ({
        url: strapiApiPaths.presignedPhotoUploadUrls,
        method: 'POST',
        body,
      }),
    }),

    createPhotos: build.mutation<Photo[], CreatePhotosReq>({
      query: (body) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePhotosMutation, useCreatePresignedUploadUrlsMutation } =
  photosApiSlice;
