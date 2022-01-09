import { generatePath } from 'react-router-dom';

import { strapiApiPaths } from '~/consts';
import { strapiApi } from '~/services';
import { User } from '~/types';

interface SendOAuthTokenReq {
  token: string;
  provider: string;
}

interface SendOAuthTokenRes {
  jwt: string;
  user: User;
}

const userApiSlice = strapiApi.injectEndpoints({
  endpoints: (build) => ({
    sendOAuthToken: build.query<SendOAuthTokenRes, SendOAuthTokenReq>({
      query: ({ token, provider }) => ({
        params: { access_token: token },
        url: generatePath(strapiApiPaths.oauthCallback, { provider }),
      }),
    }),
    getMe: build.query<User, void>({
      query: () => strapiApiPaths.me,
    }),
    updateMySettings: build.mutation<User, User['settings']>({
      query: (body) => ({
        url: strapiApiPaths.mySettings,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useLazySendOAuthTokenQuery,
  useGetMeQuery,
  useUpdateMySettingsMutation,
  endpoints: userEndpoints,
} = userApiSlice;
