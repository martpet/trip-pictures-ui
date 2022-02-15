import { Dispatch, SetStateAction } from 'react';

import {
  acceptedFileTypes,
  addExifData,
  convertHeicToJpeg,
  getNonDuplicateNewUploads,
  Upload,
} from '~/lazy/upload';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
  setShowLoadingOverlay: Dispatch<SetStateAction<boolean>>;
};

export const useAddUploads = ({ uploads, setUploads, setShowLoadingOverlay }: Arg) => {
  return async (fileList: FileList) => {
    const files = Array.from(fileList);

    let newUploads = await Promise.all(
      files.map(async (file) => {
        let upload: Upload = { file, exif: {}, errors: [] };

        if (acceptedFileTypes.includes(file.type)) {
          upload = await addExifData({ upload });
        } else {
          upload.errors.push('fileTypeWrong');
        }

        if (file.type === 'image/heic') {
          upload = await convertHeicToJpeg({ upload, setShowLoadingOverlay });
        }

        return upload;
      })
    );

    newUploads = getNonDuplicateNewUploads({ uploads, newUploads });

    if (newUploads.length) {
      setUploads([...newUploads, ...uploads]);
    }
  };
};
