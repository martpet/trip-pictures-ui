import { View } from '@adobe/react-spectrum';
import { DragEventHandler, ReactEventHandler } from 'react';

import { PreviewImageHeader, Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImage({ upload }: Props) {
  const { file } = upload;

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    URL.revokeObjectURL(event.currentTarget.src);
  };

  const preventDrag: DragEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <View>
      <PreviewImageHeader upload={upload} />
      <img
        alt={file.name}
        src={URL.createObjectURL(file)}
        onLoad={handleImageLoad}
        onDragStart={preventDrag}
        style={{ width: '100%', display: 'block' }}
      />
    </View>
  );
}
