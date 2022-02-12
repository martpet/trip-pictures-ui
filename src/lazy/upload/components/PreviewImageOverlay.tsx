import { Flex, View } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';

import { Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageOverlay({ upload }: Props) {
  const hasError = Boolean(upload.errors.length);

  if (!hasError) return null;

  return (
    <View
      position="absolute"
      left="0"
      top="0"
      width="100%"
      height="100%"
      UNSAFE_style={{
        background: 'rgba(0,0,0,0.7)',
      }}
    >
      <Flex height="100%" justifyContent="center" alignItems="center">
        <AlertIcon size="XXL" color="notice" />
      </Flex>
    </View>
  );
}