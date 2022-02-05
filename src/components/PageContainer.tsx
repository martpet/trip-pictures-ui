import { View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function PageContainer({ children }: Props) {
  return (
    <View
      height="100%"
      maxWidth="1000px"
      marginX="auto"
      padding="size-100"
      UNSAFE_style={{ boxSizing: 'border-box' }}
    >
      {children}
    </View>
  );
}
