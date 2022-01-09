import { Middleware } from '@reduxjs/toolkit';

import { userEndpoints } from '~/services';
import { loadingFinished, loadingStarted } from '~/slices';

const endpoints = [userEndpoints.sendOAuthToken, userEndpoints.getMe];

export const loadingIndicatorHandler: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    endpoints.some((endpoint) => {
      if (endpoint.matchPending(action)) {
        dispatch(loadingStarted());
        return true;
      }
      if (endpoint.matchFulfilled(action) || endpoint.matchRejected(action)) {
        dispatch(loadingFinished());
        return true;
      }
      return false;
    });

    return next(action);
  };
