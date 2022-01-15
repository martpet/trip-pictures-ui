import { Heading, Item, TabList, TabPanels, Tabs, View } from '@adobe/react-spectrum';
import { Key, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { ChooseLanguage, ToolbarPosition } from '~/components/Settings';
import { useIsMobile } from '~/hooks';
import { selectActiveSettingsTab, settingsTabSelected } from '~/slices';
import { SettingsTabKey } from '~/types';

type SettingsItem = {
  key: SettingsTabKey;
  textId: string;
  content: ReactElement;
};

export function Settings() {
  const activeTab = useSelector(selectActiveSettingsTab);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const tabsSideSpace = 'size-400';
  const headingId = 'settings-heading';

  const handleTabSelect = (key: Key) => {
    dispatch(settingsTabSelected(key as SettingsTabKey));
  };

  const items: SettingsItem[] = [
    {
      key: 'language',
      textId: 'settings.tab.language',
      content: <ChooseLanguage />,
    },
    {
      key: 'toolbar',
      textId: 'settings.tab.toolbar',
      content: <ToolbarPosition />,
    },
  ];

  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={handleTabSelect}
      items={items}
      orientation={isMobile ? 'horizontal' : 'vertical'}
      aria-labelledby={headingId}
    >
      <View>
        <Heading id={headingId} level={2} marginTop={0}>
          <FormattedMessage id="settings.heading" />
        </Heading>
        <TabList
          marginEnd={isMobile ? 0 : tabsSideSpace}
          marginBottom={isMobile ? tabsSideSpace : 0}
        >
          {({ textId }: SettingsItem) => (
            <Item>
              <FormattedMessage id={textId} />
            </Item>
          )}
        </TabList>
      </View>
      <View flexGrow={1}>
        <TabPanels>{({ content }: SettingsItem) => <Item>{content}</Item>}</TabPanels>
      </View>
    </Tabs>
  );
}
