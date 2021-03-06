import { Flex, View } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';

import { Upload } from '~/lazyload/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageErrorOverlay({ upload }: Props) {
  const hasError = Boolean(upload.validityErrors.length);

  if (!hasError) return null;

  return (
    <View
      position="absolute"
      left="0"
      top="0"
      width="100%"
      height="100%"
      UNSAFE_style={{
        background: 'rgba(0,0,0,0.75)',
      }}
    >
      <Flex
        height="100%"
        justifyContent="center"
        alignItems="center"
        UNSAFE_style={{ opacity: 0.5, color: 'white' }}
      >
        <AlertIcon size="XXL" color="notice" />
      </Flex>
    </View>
  );
}
