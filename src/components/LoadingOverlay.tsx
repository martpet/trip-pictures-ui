import { Flex, View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

import { Spinner } from '~/components';

export function LoadingOverlay() {
  const background = 'var(--spectrum-alias-background-color-modal-overlay)';

  return (
    <>
      <Overlay>
        <View height="100%" UNSAFE_style={{ background }} />
      </Overlay>
      <Overlay>
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      </Overlay>
    </>
  );
}

type OverlayProps = {
  children: ReactNode;
};

function Overlay({ children }: OverlayProps) {
  return (
    <View position="fixed" left="0" top="0" width="100vw" height="100vh" zIndex={9999}>
      {children}
    </View>
  );
}
