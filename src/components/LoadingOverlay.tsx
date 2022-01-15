import { Flex, View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

import { Spinner } from '~/components';

function Overlay({ children }: { children: ReactNode }) {
  return (
    <View position="fixed" left="0" top="0" width="100vw" height="100vh" zIndex={9999}>
      {children}
    </View>
  );
}

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
