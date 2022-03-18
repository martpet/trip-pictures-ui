import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload, error } = action;
    const errorMsg =
      payload?.data?.message?.error?.message ||
      payload?.data?.data?.message ||
      payload?.data?.message ||
      error.data?.message ||
      error.message;

    if (import.meta.env.DEV) {
      toast.error(errorMsg);
    }
    console.warn('We got a rejected action!', action);
  }

  return next(action);
};
