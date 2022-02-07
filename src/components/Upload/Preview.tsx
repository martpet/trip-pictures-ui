import { Grid, minmax, repeat, View } from '@adobe/react-spectrum';
import { DragEventHandler, ReactEventHandler, useContext } from 'react';

import { PreviewImageActions, UploadContext } from '~/components/Upload';

export function Preview() {
  const { uploads } = useContext(UploadContext);

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    URL.revokeObjectURL(event.currentTarget.src);
  };

  const handleImageDragStart: DragEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Grid columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }} gap="size-200">
      {uploads.map(({ file }, i) => (
        <Grid columns={['auto', 'auto']} key={file.lastModified + file.size}>
          <img
            alt={file.name}
            src={URL.createObjectURL(file)}
            onLoad={handleImageLoad}
            onDragStart={handleImageDragStart}
            style={{ gridColumn: '1 / -1', gridRow: '1', width: '100%' }}
          />
          <View gridColumn="2" gridRow="1" padding="size-100">
            <PreviewImageActions fileIndex={i} />
          </View>
        </Grid>
      ))}
    </Grid>
  );
}
