import { Divider, Flex } from '@adobe/react-spectrum';

import { AddPhotosButton, Logo, SettingsButton, UserButtons } from '~/components';
import { sideSpace } from '~/consts';
import { useIsTopToolbar } from '~/hooks';

export function Toolbar() {
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
          <AddPhotosButton />
          <SettingsButton />
          <UserButtons />
        </Flex>
      </Flex>
      <Divider size="M" orientation={isTopBar ? 'horizontal' : 'vertical'} />
    </Flex>
  );
}
