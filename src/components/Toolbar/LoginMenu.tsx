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

  const handleAction = (key: Key) => {
    if (key === 'facebook') loginWithProvider(key as OAuthProvider);
  };

  return (
    <MenuTrigger>
      <ActionButton isQuiet>
        <TooltipTrigger>
          <ProfileIcon />
          <Tooltip>
            <FormattedMessage id="toolbar.button.profile" />
          </Tooltip>
        </TooltipTrigger>
      </ActionButton>
      <Menu onAction={handleAction}>
        <Item key="facebook">{formatMessage({ id: 'button.login.facebook' })}</Item>
      </Menu>
    </MenuTrigger>
  );
}
