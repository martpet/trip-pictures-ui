import { Flex, View } from '@adobe/react-spectrum';
import { FormattedDate } from 'react-intl';

import { PreviewImageActions, PreviewImageError, Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageHeader({ upload }: Props) {
  const color = 'var(--spectrum-global-color-gray-800)';

  return (
    <View
      height="size-500"
      paddingX="size-100"
      backgroundColor="gray-50"
      UNSAFE_style={{ color }}
    >
      <Flex height="100%" alignItems="center">
        <PreviewImageError upload={upload} />
        {!upload.errors.length && upload.exif.dateOriginal && (
          <FormattedDate
            value={new Date(upload.exif.dateOriginal)}
            year="numeric"
            month="long"
            day="2-digit"
          />
        )}
        <View marginStart="auto">
          <PreviewImageActions upload={upload} />
        </View>
      </Flex>
    </View>
  );
}
