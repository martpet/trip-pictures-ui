import { View } from '@adobe/react-spectrum';

import { PreviewImage, PreviewItemHeader, Upload } from '~/lazyload/upload';

type Props = {
  upload: Upload;
};

export function PreviewItem({ upload }: Props) {
  return (
    <View>
      <PreviewItemHeader upload={upload} />
      <PreviewImage upload={upload} />
    </View>
  );
}
