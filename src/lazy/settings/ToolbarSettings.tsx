import { ActionGroup, Item, Text } from '@adobe/react-spectrum';
import { IconPropsWithoutChildren } from '@react-spectrum/icon';
import ArrowLeft from '@spectrum-icons/workflow/ArrowLeft';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import { Key } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { useIsToolbarInMobileMode } from '~/hooks';
import { SettingsSection } from '~/lazy/settings';
import { selectToolbarPosition, toolbarPositionSelected } from '~/slices';
import { ToolbarPosition as ToolbarPos } from '~/types';

type ButtonItem = {
  id: string;
  textId: string;
  Icon: (props: IconPropsWithoutChildren) => JSX.Element;
};

const items: ButtonItem[] = [
  {
    id: 'left',
    textId: 'settings.toolbar.position.left',
    Icon: ArrowLeft,
  },
  {
    id: 'top',
    textId: 'settings.toolbar.position.top',
    Icon: ArrowUp,
  },
];

export function ToolbarSettings() {
  const dispatch = useDispatch();
  const toolbarPosition = useSelector(selectToolbarPosition);
  const toolbarSettingsDisabled = useIsToolbarInMobileMode();

  const handleAction = (key: Key) => {
    dispatch(toolbarPositionSelected(key as ToolbarPos));
  };

  if (toolbarSettingsDisabled) {
    return (
      <em>
        <FormattedMessage id="settings.toolbar.disabled" />
      </em>
    );
  }

  return (
    <SettingsSection headingKey="settings.toolbar.position.heading">
      <ActionGroup
        selectionMode="single"
        items={items}
        selectedKeys={[toolbarPosition]}
        onAction={handleAction}
        density="compact"
      >
        {({ Icon, textId }: ButtonItem) => (
          <Item>
            <Icon />
            <Text>
              <FormattedMessage id={textId} />
            </Text>
          </Item>
        )}
      </ActionGroup>
    </SettingsSection>
  );
}
