import { Grid, minmax, repeat, View } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { PreviewImage, PreviewImageActions, UploadContext } from '~/components/Upload';

export function Preview() {
  const { uploads } = useContext(UploadContext);

  return (
    <Grid columns={{ S: repeat('auto-fill', minmax('size-5000', '1fr')) }} gap="size-200">
      {uploads.map(({ file, errors }, i) => (
        <Grid
          columns={['auto', 'auto']}
          rows={['auto']}
          key={file.lastModified + file.size}
        >
          <View gridColumn="1 / -1">
            <PreviewImage file={file} />
          </View>
          <View gridColumn="2" padding="size-100">
            {errors.length === 0 && <PreviewImageActions fileIndex={i} />}
          </View>
        </Grid>
      ))}
    </Grid>
  );
}
