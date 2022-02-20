import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import {
  acceptedFileTypes,
  addExifData,
  getNonDuplicateNewUploads,
  Upload,
} from '~/lazy/upload';
import { loadingFinished, loadingStarted } from '~/slices';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
};

export const useAddUploads = ({ uploads, setUploads }: Arg) => {
  const dispatch = useDispatch();

  return async (fileList: FileList) => {
    const files = Array.from(fileList);

    let newUploads = await Promise.all(
      files.map(async (file) => {
        let upload: Upload = {
          file,
          exif: {},
          errors: [],
          canRotate: true,
        };

        if (acceptedFileTypes.includes(file.type)) {
          upload = await addExifData({ upload });
        } else {
          upload.errors.push('fileTypeWrong');
        }

        if (file.type === 'image/heic') {
          dispatch(loadingStarted());
          const { convertHeicToJpeg } = await import('../utils/convertHeicToJpeg');
          upload = await convertHeicToJpeg({ upload });
          upload.canRotate = false;
          dispatch(loadingFinished());
        }

        if (upload.errors.length) {
          upload.canRotate = false;
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
