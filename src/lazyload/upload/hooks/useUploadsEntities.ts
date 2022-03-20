import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  acceptedFileTypes,
  addExifData,
  getNonDuplicateNewUploads,
  Upload,
} from '~/lazyload/upload';
import { loadingFinished, loadingStarted } from '~/slices';

type Arg = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;
  isUploading: boolean;
};

export const useUploadsEntities = ({ uploads, setUploads, isUploading }: Arg) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const addUploads = async (fileList: FileList) => {
    if (isUploading) return;
    const files = Array.from(fileList);

    let newUploads = await Promise.all(
      files.map(async (file, index) => {
        let upload: Upload = {
          id: `${+new Date()}-${index}`,
          file,
          exif: {},
          validityErrors: [],
          canRotate: true,
          isStarted: false,
          isComplete: false,
          isFailed: false,
          progress: 0,
        };

        if (acceptedFileTypes.includes(file.type)) {
          upload = await addExifData({ upload });
        } else {
          upload.validityErrors.push('fileTypeWrong');
        }

        if (file.type === 'image/heic') {
          dispatch(loadingStarted());
          toast(formatMessage({ id: 'upload.heicToast' }, { count: files.length }), {
            duration: 99999,
          });
          const { convertHeicToJpeg } = await import('../utils/convertHeicToJpeg');
          upload = await convertHeicToJpeg({ upload });
          dispatch(loadingFinished());
          toast.dismiss();
        }

        if (upload.validityErrors.length || file.type === 'image/heic') {
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

  const removeUpload = (id: string) => {
    setUploads((state) => state.filter((upload) => upload.id !== id));
  };

  const editUpload = (id: string, patch: Partial<Upload>) => {
    setUploads((state) => {
      const upload = state.find((item) => item.id === id)!;
      const uploadIndex = state.indexOf(upload);
      const newState = [...state];
      const newUpload = { ...upload, ...patch };
      newState.splice(uploadIndex, 1, newUpload);
      return newState;
    });
  };

  return {
    addUploads,
    removeUpload,
    editUpload,
  };
};
