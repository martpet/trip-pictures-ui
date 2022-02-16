import { Flex, View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

import { Spinner } from '~/components';

export function LoadingOverlay() {
  return (
    <>
      <Overlay>
        <View
          height="100%"
          UNSAFE_style={{
            background: 'var(--spectrum-alias-background-color-modal-overlay)',
          }}
        />
      </Overlay>
      <Overlay>
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      </Overlay>
    </>
  );
}

function Overlay({ children }: { children: ReactNode }) {
  return (
    <View position="absolute" left="0" top="0" width="100%" height="100%" zIndex={9999}>
      {children}
    </View>
  );
}
