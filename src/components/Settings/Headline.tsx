import { Divider, Heading } from '@adobe/react-spectrum';
import { ReactNode } from 'react';

type HeadlineProps = {
  children: ReactNode;
  id?: string;
};

export function Headline({ children, id }: HeadlineProps) {
  return (
    <>
      <Heading id={id} level={3} marginTop={0}>
        {children}
      </Heading>
      <Divider size="S" marginBottom="size-300" />
    </>
  );
}
