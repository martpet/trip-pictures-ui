import { Flex, View } from '@adobe/react-spectrum';
import { useContext } from 'react';

import {
  PreviewItemActions,
  PreviewItemDate,
  PreviewItemError,
  Upload,
  UploadContext,
} from '~/components/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemHeader({ upload }: Props) {
  const { isUploading } = useContext(UploadContext);

  return (
    <View
      height="size-500"
      paddingX="size-100"
      backgroundColor="gray-50"
      UNSAFE_style={{ color: 'var(--spectrum-global-color-gray-800)' }}
    >
      <Flex height="100%" alignItems="center">
        {!isUploading && (
          <>
            <PreviewItemDate upload={upload} />
            <PreviewItemError upload={upload} />
            <View marginStart="auto">
              <PreviewItemActions upload={upload} />
            </View>
          </>
        )}
      </Flex>
    </View>
  );
}
