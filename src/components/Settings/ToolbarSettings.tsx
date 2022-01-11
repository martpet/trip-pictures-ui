import { ActionGroup, Item, Text } from '@adobe/react-spectrum';
import ArrowLeft from '@spectrum-icons/workflow/ArrowLeft';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import { Key, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Headline } from '~/components';
import { useIsToolbarInMobileMode } from '~/hooks';
import { selectToolbarPosition, toolbarPositionSelected } from '~/slices';
import { ToolbarPosition } from '~/types';

export function ToolbarSettings() {
  const dispatch = useDispatch();
  const selectedPosition = useSelector(selectToolbarPosition);
  const toolbarSettingsDisabled = useIsToolbarInMobileMode();

  const handleAction = (key: Key) => {
    dispatch(toolbarPositionSelected(key as ToolbarPosition));
  };

  type PositionButton = {
    id: string;
    textKey: string;
    icon: ReactElement;
  };

  const buttons: PositionButton[] = [
    {
      id: 'left',
      textKey: 'settings.toolbar.position.button.left',
      icon: <ArrowLeft />,
    },
    {
      id: 'top',
      textKey: 'settings.toolbar.position.button.top',
      icon: <ArrowUp />,
    },
  ];

  if (toolbarSettingsDisabled) {
    return (
      <em>
        <FormattedMessage id="settings.toolbar.disabled" />
      </em>
    );
  }

  return (
    <>
      <Headline>
        <FormattedMessage id="settings.toolbar.position.heading" />
      </Headline>

      <ActionGroup
        selectionMode="single"
        items={buttons}
        selectedKeys={[selectedPosition]}
        onAction={handleAction}
        density="compact"
      >
        {(button: PositionButton) => (
          <Item>
            {button.icon}
            <Text>
              <FormattedMessage id={button.textKey} />
            </Text>
          </Item>
        )}
      </ActionGroup>
    </>
  );
}
