import { Middleware } from '@reduxjs/toolkit';

import { logout } from '~/slices';

export const forbiddenRequestHandler: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if ([401, 403].includes(action.payload?.status)) {
      dispatch(logout());
    }
    return next(action);
  };
