import { Flex, View } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';

import { Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageErrorOverlay({ upload }: Props) {
  const { errors } = upload;
  const error = errors[0];
  const overlayColor = 'var(--spectrum-alias-background-color-modal-overlay)';

  if (!error) return null;

  return (
    <View height="100%" UNSAFE_style={{ background: overlayColor }}>
      <View paddingX="size-200" paddingY="size-100" backgroundColor="static-black">
        <Flex height="100%" alignItems="center">
          <AlertIcon color="negative" marginEnd="size-150" />
          <span style={{ color: 'var(--spectrum-global-color-static-white)' }}>
            {error}
          </span>
        </Flex>
      </View>
    </View>
  );
}
