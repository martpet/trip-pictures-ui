import { Grid, minmax, repeat } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { useIsMobile } from '~/hooks';
import {
  ButtonChooseFiles,
  PreviewErrorsSummary,
  PreviewItem,
  UploadContext,
} from '~/lazy/upload';

export function Preview() {
  const { uploads } = useContext(UploadContext);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <ButtonChooseFiles isQuiet={false} marginBottom="size-350" />}

      <PreviewErrorsSummary />

      <Grid
        columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }}
        columnGap="size-300"
        rowGap="size-400"
      >
        {uploads.map((upload) => (
          <PreviewItem key={upload.id} upload={upload} />
        ))}
      </Grid>
    </>
  );
}
