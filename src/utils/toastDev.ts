import toast from 'react-hot-toast';

type Args = Parameters<typeof toast.error>;

export const toastDev = (...toastArgs: Args) => {
  if (import.meta.env.DEV) {
    toast.error(...toastArgs);
  }
};
