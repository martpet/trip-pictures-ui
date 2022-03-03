import { Upload } from '~/lazy/upload';

type Arg = {
  validUploads: Upload[];
};

export const useCanStartUpload = ({ validUploads }: Arg) => {
  return Boolean(validUploads.length);
};
