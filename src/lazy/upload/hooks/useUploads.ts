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
  isUploading: boolean;
};

export const useUploads = ({ uploads, setUploads, isUploading }: Arg) => {
  const dispatch = useDispatch();

  const addUploads = async (fileList: FileList) => {
    if (isUploading) return;
    const files = Array.from(fileList);

    let newUploads = await Promise.all(
      files.map(async (file, index) => {
        let upload: Upload = {
          id: `${+new Date()}-${index}`,
          file,
          exif: {},
          errors: [],
          canRotate: true,
          isUploading: false,
          isComplete: false,
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
