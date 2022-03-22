import { strapiApiPaths } from '~/consts';
import { strapiApi } from '~/services';
import { Photo } from '~/types';

const photosApi = strapiApi.injectEndpoints({
  endpoints: ({ query }) => ({
    getPhotos: query<Photo[], void>({
      query: () => strapiApiPaths.photos,
      providesTags: ['Photo'],
    }),
  }),
});

export const { useGetPhotosQuery } = photosApi;
