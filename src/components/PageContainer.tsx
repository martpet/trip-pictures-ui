import { View } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
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
