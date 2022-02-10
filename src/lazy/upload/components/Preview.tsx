import { Grid, minmax, repeat } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { useIsMobile } from '~/hooks';
import {
  ButtonAddPhotos,
  PreviewImage,
  PreviewStatus,
  UploadContext,
} from '~/lazy/upload';

export function Preview() {
  const { uploads } = useContext(UploadContext);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <ButtonAddPhotos isQuiet={false} marginBottom="size-350" />}
      <PreviewStatus />
      <Grid
        columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }}
        gap="size-200"
      >
        {uploads.map((upload) => (
          <PreviewImage key={upload.file.lastModified} upload={upload} />
        ))}
      </Grid>
    </>
  );
}
