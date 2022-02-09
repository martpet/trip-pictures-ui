import { Button, Flex, Heading } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '~/components';
import { logout, selectCurrentUser } from '~/slices';

export function ProfileMenu() {
  const user = useSelector(selectCurrentUser)!;
  const dispatch = useDispatch();

  const handleLogoutClick = () => dispatch(logout());

  return (
    <Flex direction="column" alignItems="center">
      <Avatar user={user} size="XXL" />
      <Heading level={2} marginBottom="size-300">
        {`${user.firstName} ${user.lastName}`}
      </Heading>
      <Button variant="secondary" onPress={handleLogoutClick}>
        <FormattedMessage id="button.logout" />
      </Button>
    </Flex>
  );
}
