import { Divider, Flex } from '@adobe/react-spectrum';

import { AddPhotosButton, Logo, SettingsMenu, UserMenu } from '~/components';
import { sideSpace } from '~/consts';
import { useToolbarPosition } from '~/hooks';

export function Toolbar() {
  const topBar = useToolbarPosition() === 'top';
  const direction = topBar ? 'row' : 'column';

  return (
    <Flex direction={topBar ? 'column' : 'row'} height="100%">
      <Flex
        flexGrow={1}
        direction={direction}
        alignItems="center"
        justifyContent="space-between"
        marginX={topBar ? sideSpace : 0}
        marginY={topBar ? 0 : sideSpace}
      >
        <Logo />
        <Flex direction={direction} gap="size-85">
          <AddPhotosButton />
          <SettingsMenu />
          <UserMenu />
        </Flex>
      </Flex>
      <Divider size="M" orientation={topBar ? 'horizontal' : 'vertical'} />
    </Flex>
  );
}
