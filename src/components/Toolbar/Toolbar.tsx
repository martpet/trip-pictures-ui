import { Divider, Flex } from '@adobe/react-spectrum';
import { useSelector } from 'react-redux';

import {
  LoginMenu,
  Logo,
  ProfileMenu,
  SettingsDialogTrigger,
  UploadDialogTrigger,
} from '~/components';
import { sideSpace } from '~/consts';
import { useIsTopToolbar } from '~/hooks';
import { selectCurrentUser } from '~/slices';

export function Toolbar() {
  const user = useSelector(selectCurrentUser);
  const isTopBar = useIsTopToolbar();
  const direction = isTopBar ? 'row' : 'column';

  return (
    <Flex direction={isTopBar ? 'column' : 'row'} height="100%">
      <Flex
        flexGrow={1}
        direction={direction}
        alignItems="center"
        justifyContent="space-between"
        marginX={isTopBar ? sideSpace : 0}
        marginY={isTopBar ? 0 : sideSpace}
      >
        <Logo />
        <Flex direction={direction} gap="size-85">
          <UploadDialogTrigger />
          <SettingsDialogTrigger />
          {user ? <ProfileMenu /> : <LoginMenu />}
        </Flex>
      </Flex>
      <Divider size="M" orientation={isTopBar ? 'horizontal' : 'vertical'} />
    </Flex>
  );
}
