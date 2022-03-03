import { strapiApiPaths } from '~/consts';
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

type CreatePhotoReq = Pick<
  Photo,
  's3Key' | 'latitude' | 'longitude' | 'altitude' | 'bearing' | 'dateOriginal'
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

    createPhoto: build.mutation<Photo, CreatePhotoReq>({
      query: (body) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePhotoMutation, useCreatePresignedUploadUrlsMutation } =
  photosApiSlice;
