import { Upload, useValidUploads } from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
};

export const useCanStartUpload = ({ uploads }: Arg) => {
  const { validUploads } = useValidUploads({ uploads });
  return Boolean(validUploads.length);
};
