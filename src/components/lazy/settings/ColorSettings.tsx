import { ActionGroup, Item, Text } from '@adobe/react-spectrum';
import { Key } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { SettingsSection } from '~/components/lazy/settings';
import { colorSchemeSelected, selectColorSchemeSetting } from '~/slices';
import { Settings } from '~/types';

type ButtonItem = {
  id: Settings['colorScheme'];
  textId: string;
};

const items: ButtonItem[] = [
  {
    id: 'light',
    textId: 'settings.color.scheme.light',
  },
  {
    id: 'dark',
    textId: 'settings.color.scheme.dark',
  },
  {
    id: 'auto',
    textId: 'settings.color.scheme.auto',
  },
];

export function ColorSettings() {
  const dispatch = useDispatch();
  const colorSchemeSetting = useSelector(selectColorSchemeSetting);

  const handleAction = (key: Key) => {
    dispatch(colorSchemeSelected(key as Settings['colorScheme']));
  };

  return (
    <SettingsSection headingKey="settings.color.scheme.heading">
      <ActionGroup
        selectionMode="single"
        items={items}
        selectedKeys={[colorSchemeSetting]}
        onAction={handleAction}
        density="compact"
      >
        {({ textId }: ButtonItem) => (
          <Item>
            <Text>
              <FormattedMessage id={textId} />
            </Text>
          </Item>
        )}
      </ActionGroup>
    </SettingsSection>
  );
}
