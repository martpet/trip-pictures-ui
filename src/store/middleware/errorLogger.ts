import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { toastDev } from '~/utils';

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage =
      action.payload?.data?.message?.error?.message ||
      action.payload?.data?.data?.message ||
      action.payload?.data?.message ||
      action.error.data?.message ||
      action.error.message;

    toastDev(errorMessage);
    // eslint-disable-next-line no-console
    console.warn('We got a rejected action!', action);
  }

  return next(action);
};
