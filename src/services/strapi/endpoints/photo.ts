import { strapiApiPaths } from '~/consts';
import { strapiApi } from '~/services';
import { Photo } from '~/types';

type CreatePhotoReq = {
  s3key: string;
};

type CreatePresignedUploadUrlsReq = {
  uploadsLength: number;
};

type CreatePresignedUploadUrlsRes = Array<{
  url: string;
  fields: { [key: string]: string };
}>;

const photosApiSlice = strapiApi.injectEndpoints({
  endpoints: (build) => ({
    createPhoto: build.mutation<Photo, CreatePhotoReq>({
      query: (body) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body,
      }),
    }),
    createPresignedPhotoUploadUrls: build.mutation<
      CreatePresignedUploadUrlsRes,
      CreatePresignedUploadUrlsReq
    >({
      query: (body) => ({
        url: strapiApiPaths.presignedPhotoUploadUrls,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePhotoMutation, useCreatePresignedPhotoUploadUrlsMutation } =
  photosApiSlice;
