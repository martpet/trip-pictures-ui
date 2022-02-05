import { Divider, Heading } from '@adobe/react-spectrum';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  headingKey: string;
  children: ReactNode;
};

export function SettingsSection({ children, headingKey }: Props) {
  return (
    <>
      <Heading id={headingKey} level={3} marginTop={0}>
        <FormattedMessage id={headingKey} />
      </Heading>

      <Divider size="S" marginBottom="size-300" />
      {children}
    </>
  );
}
