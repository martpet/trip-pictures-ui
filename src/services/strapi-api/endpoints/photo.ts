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

const photosApi = strapiApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createPresignedUploadUrls: mutation<CreatePresignedUrlsRes, CreatePresignedUrlsReq>({
      query: (body) => ({
        url: strapiApiPaths.presignedPhotoUploadUrls,
        method: 'POST',
        body,
      }),
    }),
    createPhotos: mutation<Photo[], CreatePhotosReq>({
      query: (body) => ({
        url: strapiApiPaths.photos,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Photo'],
    }),
    getPhotos: query<Photo[], void>({
      query: () => strapiApiPaths.photos,
      providesTags: ['Photo'],
    }),
  }),
});

export const {
  useCreatePresignedUploadUrlsMutation,
  useCreatePhotosMutation,
  useGetPhotosQuery,
} = photosApi;
