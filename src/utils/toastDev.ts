import toast from 'react-hot-toast';

export const toastDev = (...args: Parameters<typeof toast.error>) => {
  if (import.meta.env.DEV) {
    toast.error(...args);
  }
};
