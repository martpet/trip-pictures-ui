import { ActionButton, Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { Avatar, ProfileMenu } from '~/components';
import { selectCurrentUser } from '~/slices';

export function ProfileButton() {
  const user = useSelector(selectCurrentUser)!;
  const { formatMessage } = useIntl();

  return (
    <DialogTrigger type="popover">
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.profile' })}>
        <Avatar user={user} />
      </ActionButton>
      <Dialog>
        <Content>
          <ProfileMenu />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
