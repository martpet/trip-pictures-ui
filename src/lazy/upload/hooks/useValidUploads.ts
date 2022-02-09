import { Upload } from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
};

export const useValidUploads = ({ uploads }: Arg) => {
  const validUploads: Upload[] = [];
  const invalidUploads: Upload[] = [];

  uploads.forEach((upload: Upload) => {
    const list = upload.errors.length ? invalidUploads : validUploads;
    list.push(upload);
  });

  return {
    validUploads,
    invalidUploads,
  };
};
