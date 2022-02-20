import { Grid, minmax, repeat } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { useIsMobile } from '~/hooks';
import {
  ButtonAddFiles,
  PreviewErrorsSummary,
  PreviewImage,
  UploadContext,
} from '~/lazy/upload';

export function Preview() {
  const { uploads } = useContext(UploadContext);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <ButtonAddFiles isQuiet={false} marginBottom="size-350" />}

      <PreviewErrorsSummary />

      <Grid
        columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }}
        gap="size-200"
      >
        {uploads.map((upload) => (
          <PreviewImage
            key={upload.file.size + upload.file.lastModified}
            upload={upload}
          />
        ))}
      </Grid>
    </>
  );
}
