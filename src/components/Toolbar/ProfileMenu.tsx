import {
  ActionButton,
  Button,
  Content,
  Dialog,
  DialogTrigger,
  Flex,
  Heading,
} from '@adobe/react-spectrum';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '~/components';
import { logout, selectCurrentUser } from '~/slices';

export function ProfileMenu() {
  const user = useSelector(selectCurrentUser)!;
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const handleLogoutClick = () => dispatch(logout());

  return (
    <DialogTrigger type="popover">
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.profile' })}>
        <Avatar user={user} />
      </ActionButton>
      <Dialog>
        <Content>
          <Flex direction="column" alignItems="center">
            <Avatar user={user} size="XXL" />
            <Heading level={2} marginBottom="size-300">
              {`${user.firstName} ${user.lastName}`}
            </Heading>
            <Button variant="secondary" onPress={handleLogoutClick}>
              <FormattedMessage id="button.logout" />
            </Button>
          </Flex>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
