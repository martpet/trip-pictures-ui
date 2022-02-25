import { Grid, minmax, repeat } from '@adobe/react-spectrum';
import { useContext } from 'react';

import {
  ButtonSelectFiles,
  PreviewErrorsSummary,
  PreviewItem,
  UploadContext,
} from '~/components/lazy/upload';
import { useIsMobile } from '~/hooks';

export function Preview() {
  const { uploads } = useContext(UploadContext);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <ButtonSelectFiles isQuiet={false} marginBottom="size-350" />}

      <PreviewErrorsSummary />

      <Grid
        columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }}
        gap="size-200"
      >
        {uploads.map((upload) => (
          <PreviewItem key={upload.id} upload={upload} />
        ))}
      </Grid>
    </>
  );
}
