import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import console from 'console';
import toast from 'react-hot-toast';

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) && import.meta.env.DEV) {
    const errorMsg =
      action.payload?.data?.message?.error?.message ||
      action.payload?.data?.data?.message ||
      action.payload?.data?.message ||
      action.error.data?.message ||
      action.error.message;

    toast.error(errorMsg);
    console.warn('We got a rejected action!', action);
  }

  return next(action);
};
