import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { servicesUrls } from '~/consts';
import { RootState } from '~/types';

export const strapiApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: servicesUrls.strapiApi,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState;
      const { token } = auth;

      if (token) headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
