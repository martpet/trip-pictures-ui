import { View } from '@adobe/react-spectrum';
import { ReactEventHandler, useContext } from 'react';

import { UploadContext } from '~/components/Upload';

export function Preview() {
  const { files } = useContext(UploadContext);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    URL.revokeObjectURL(event.currentTarget.src);
  };

  return (
    <View>
      {files.map((file) => (
        <img
          key={file.name}
          alt={file.name}
          src={URL.createObjectURL(file)}
          onLoad={handleLoad}
        />
      ))}
    </View>
  );
}
