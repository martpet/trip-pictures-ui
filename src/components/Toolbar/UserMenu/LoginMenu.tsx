import {
  ActionButton,
  Item,
  Menu,
  MenuTrigger,
  Tooltip,
  TooltipTrigger,
} from '@adobe/react-spectrum';
import ProfileIcon from '@spectrum-icons/workflow/RealTimeCustomerProfile';
import { Key } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLoginWithProvider } from '~/hooks';
import { OAuthProvider } from '~/types';

export function LoginMenu() {
  const { formatMessage } = useIntl();
  const loginWithProvider = useLoginWithProvider();
  const handleLogin = (key: Key) => loginWithProvider(key as OAuthProvider);

  return (
    <MenuTrigger>
      <ActionButton isQuiet>
        <TooltipTrigger>
          <ProfileIcon />
          <Tooltip>
            <FormattedMessage id="button.profile" />
          </Tooltip>
        </TooltipTrigger>
      </ActionButton>
      <Menu onAction={handleLogin}>
        <Item key="facebook">{formatMessage({ id: 'button.login.facebook' })}</Item>
      </Menu>
    </MenuTrigger>
  );
}
