import { Flex, View } from '@adobe/react-spectrum';
import { useContext } from 'react';

import {
  PreviewItemActions,
  PreviewItemDate,
  PreviewItemError,
  PreviewItemProgress,
  Upload,
  UploadContext,
} from '~/lazyload/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemHeader({ upload }: Props) {
  const { isUploadStarted } = useContext(UploadContext);

  return (
    <View
      borderTopWidth="thin"
      borderTopColor="gray-50"
      height="size-500"
      backgroundColor="gray-75"
      paddingStart="size-100"
    >
      <Flex height="100%" alignItems="center">
        {!isUploadStarted && (
          <>
            <PreviewItemDate upload={upload} />
            <PreviewItemError upload={upload} />
            <View marginStart="auto">
              <PreviewItemActions upload={upload} />
            </View>
          </>
        )}
        {isUploadStarted && <PreviewItemProgress upload={upload} />}
      </Flex>
    </View>
  );
}
