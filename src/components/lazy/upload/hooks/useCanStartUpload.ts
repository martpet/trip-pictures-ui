import { Upload } from '~/components/lazy/upload';

type Arg = {
  validUploads: Upload[];
};

export const useCanStartUpload = ({ validUploads }: Arg) => {
  return Boolean(validUploads.length);
};
