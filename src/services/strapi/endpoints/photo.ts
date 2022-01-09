import { strapiApiPaths } from '~/consts';
import { strapiApi } from '~/services';
import { Photo } from '~/types';

interface GenerateUploadUrlRes {
  url: string;
  fields: { [key: string]: string };
}

const photosApiSlice = strapiApi.injectEndpoints({
  endpoints: (build) => ({
    createPhoto: build.mutation<Photo, string>({
      query: (s3key) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body: { s3key },
      }),
    }),
    generateUploadUrl: build.mutation<GenerateUploadUrlRes, void>({
      query: () => ({
        url: strapiApiPaths.generatePhotoUploadUrl,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreatePhotoMutation, useGenerateUploadUrlMutation } = photosApiSlice;
