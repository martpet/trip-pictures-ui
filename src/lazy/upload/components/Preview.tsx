import { Grid, minmax, repeat, View } from '@adobe/react-spectrum';
import { useContext } from 'react';

import {
  PreviewErrorsOverview,
  PreviewImage,
  PreviewImageActions,
  PreviewImageErrorOverlay,
  UploadContext,
} from '~/lazy/upload';

export function Preview() {
  const { uploads } = useContext(UploadContext);

  return (
    <>
      <PreviewErrorsOverview />
      <Grid
        columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }}
        gap="size-200"
      >
        {uploads.map((upload) => (
          <Grid columns={['auto', 'auto']} key={upload.file.lastModified}>
            <View gridColumn="1 / -1" gridRow="1">
              <PreviewImage upload={upload} />
            </View>
            <View gridColumn="2" gridRow="1" padding="size-100">
              <PreviewImageActions upload={upload} />
            </View>
            <View gridColumn="1 / -1" gridRow="1">
              <PreviewImageErrorOverlay upload={upload} />
            </View>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
