import { Upload } from '~/lazyload/upload';

type Arg = {
  validUploads: Upload[];
};

export const useCanStartUpload = ({ validUploads }: Arg) => {
  return Boolean(validUploads.length);
};
