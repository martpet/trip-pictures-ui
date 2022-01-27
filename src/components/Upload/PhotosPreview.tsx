import { ActionButton, Grid, minmax, repeat } from '@adobe/react-spectrum';
import MoreIcon from '@spectrum-icons/workflow/MoreSmall';
import { DragEventHandler, ReactEventHandler, useContext } from 'react';

import { UploadContext } from '~/components/Upload';

export function PhotosPreview() {
  const { files } = useContext(UploadContext);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    URL.revokeObjectURL(event.currentTarget.src);
  };
  const preventEvent: DragEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      <ActionButton>
        <MoreIcon />
      </ActionButton>
      <Grid columns={repeat('auto-fill', minmax('size-5000', '1fr'))} gap="size-200">
        {files.map((file) => (
          <img
            key={file.name}
            alt={file.name}
            src={URL.createObjectURL(file)}
            onLoad={handleLoad}
            onDragStart={preventEvent}
            style={{ width: '100%' }}
          />
        ))}
      </Grid>
    </>
  );
}
