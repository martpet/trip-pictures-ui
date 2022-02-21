import { Divider, Flex } from '@adobe/react-spectrum';

import {
  Logo,
  ProfileDialogTrigger,
  SettingsPopover,
  UploadDialogTrigger,
} from '~/components';
import { sideSpace } from '~/consts';
import { useIsTopToolbar } from '~/hooks';

export function Toolbar() {
  const isTopBar = useIsTopToolbar();
  const containerDirection = isTopBar ? 'column' : 'row';
  const contentDirection = isTopBar ? 'row' : 'column';

  return (
    <Flex direction={containerDirection} height="100%">
      <Flex
        flexGrow={1}
        direction={contentDirection}
        alignItems="center"
        justifyContent="space-between"
        marginX={isTopBar ? sideSpace : 0}
        marginY={isTopBar ? 0 : sideSpace}
      >
        <Logo />
        <Flex direction={contentDirection} gap="size-85">
          <UploadDialogTrigger />
          <SettingsPopover />
          <ProfileDialogTrigger />
        </Flex>
      </Flex>
      <Divider size="M" orientation={isTopBar ? 'horizontal' : 'vertical'} />
    </Flex>
  );
}
