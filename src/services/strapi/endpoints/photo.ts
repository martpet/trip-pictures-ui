import { strapiApiPaths } from '~/consts';
import { strapiApi } from '~/services';
import { Photo } from '~/types';

type GeneratePhotoUploadUrlsReq = {
  uploadsSize: number;
};

type GeneratePhotoUploadUrlsRes = Array<{
  url: string;
  fields: { [key: string]: string };
}>;

const photosApiSlice = strapiApi.injectEndpoints({
  endpoints: (build) => ({
    createPhoto: build.mutation<Photo, string>({
      query: (s3key) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body: { s3key },
      }),
    }),
    generatePhotoUploadUrls: build.mutation<
      GeneratePhotoUploadUrlsRes,
      GeneratePhotoUploadUrlsReq
    >({
      query: (body) => ({
        url: strapiApiPaths.generatePhotoUploadUrls,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePhotoMutation, useGeneratePhotoUploadUrlsMutation } =
  photosApiSlice;
