import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { userEndpoints } from '~/services';
import { RootState, User } from '~/types';

export type AuthSliceState = {
  currentUser?: User;
  token?: string;
};

const initialState: AuthSliceState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userEndpoints.sendOAuthToken.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload.user;
        state.token = payload.jwt;
      }
    );
    builder.addMatcher(
      isAnyOf(
        userEndpoints.getMe.matchFulfilled,
        userEndpoints.updateMySettings.matchFulfilled
      ),
      (state, { payload }) => {
        state.currentUser = payload;
      }
    );
  },
});

export const selectCurrentUser = ({ auth }: RootState) => auth.currentUser;
export const selectCurrentUserToken = ({ auth }: RootState) => auth.token;

export const { logout } = authSlice.actions;
