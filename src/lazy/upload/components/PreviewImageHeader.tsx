import { Flex, View } from '@adobe/react-spectrum';

import {
  PreviewImageActions,
  PreviewImageDate,
  PreviewImageError,
  Upload,
} from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageHeader({ upload }: Props) {
  return (
    <View
      height="size-500"
      paddingX="size-100"
      backgroundColor="gray-50"
      UNSAFE_style={{ color: 'var(--spectrum-global-color-gray-800)' }}
    >
      <Flex height="100%" alignItems="center">
        <PreviewImageDate upload={upload} />
        <PreviewImageError upload={upload} />
        <View marginStart="auto">
          <PreviewImageActions upload={upload} />
        </View>
      </Flex>
    </View>
  );
}
