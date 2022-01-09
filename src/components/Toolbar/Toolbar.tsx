import { Divider, Flex } from '@adobe/react-spectrum';

import { Logo, SettingsMenu, UserMenu } from '~/components';
import { sideSpace } from '~/consts';
import { useToolbarPosition } from '~/hooks';

export function Toolbar() {
  const toolbarPosition = useToolbarPosition();
  const barOnTop = toolbarPosition === 'top';
  const itemsDirection = barOnTop ? 'row' : 'column';

  return (
    <Flex direction={barOnTop ? 'column' : 'row'} height="100%">
      <Flex
        flexGrow={1}
        direction={itemsDirection}
        alignItems="center"
        justifyContent="space-between"
        marginX={barOnTop ? sideSpace : 0}
        marginY={barOnTop ? 0 : sideSpace}
      >
        <Logo />
        <Flex direction={itemsDirection} gap="size-25">
          <SettingsMenu />
          <UserMenu />
        </Flex>
      </Flex>
      <Divider size="M" orientation={barOnTop ? 'horizontal' : 'vertical'} />
    </Flex>
  );
}
