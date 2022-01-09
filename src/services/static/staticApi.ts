import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { servicesUrls } from '~/consts';

export const staticApi = createApi({
  reducerPath: 'staticApi',
  baseQuery: fetchBaseQuery({
    baseUrl: servicesUrls.staticApi,
  }),
  endpoints: () => ({}),
});
