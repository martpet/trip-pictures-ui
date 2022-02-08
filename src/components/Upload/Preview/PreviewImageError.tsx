import { Flex, View } from '@adobe/react-spectrum';
import Alert from '@spectrum-icons/workflow/Alert';

import { Upload } from '~/types';

type Props = {
  upload: Upload;
};

export function PreviewImageError({ upload }: Props) {
  const { errors } = upload;

  if (!errors.length) return null;

  return (
    <View
      height="100%"
      UNSAFE_style={{
        background: 'var(--spectrum-alias-background-color-modal-overlay)',
      }}
    >
      <View backgroundColor="static-black" paddingX="size-200" paddingY="size-100">
        <Flex
          height="100%"
          alignItems="center"
          UNSAFE_style={{ color: 'var(--spectrum-global-color-static-white)' }}
        >
          <Alert color="negative" marginEnd="size-150" />
          asdf
        </Flex>
      </View>
    </View>
  );
}
