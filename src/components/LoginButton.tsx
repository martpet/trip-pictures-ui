import { Button, Text } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';

import { useLoginWithProvider } from '~/hooks';

export function LoginButton() {
  const loginWithProvider = useLoginWithProvider();

  const handlePress = () => {
    loginWithProvider('facebook');
  };

  return (
    <Button variant="cta" onPress={handlePress}>
      <Text>
        <FormattedMessage id="button.login.facebook" />
      </Text>
    </Button>
  );
}
