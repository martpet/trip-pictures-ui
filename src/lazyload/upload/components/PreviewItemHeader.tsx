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
  const { isUploading } = useContext(UploadContext);

  return (
    <View height="size-400">
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
        {isUploading && <PreviewItemProgress upload={upload} />}
      </Flex>
    </View>
  );
}
