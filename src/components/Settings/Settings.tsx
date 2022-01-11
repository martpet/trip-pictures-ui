import { Heading, Item, TabList, TabPanels, Tabs, View } from '@adobe/react-spectrum';
import { Key, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { LanguageSettings, ToolbarSettings } from '~/components';
import { useIsMobile } from '~/hooks';
import { selectActiveSettingsTab, settingsTabSelected } from '~/slices';
import { SettingsTabKey } from '~/types';

export function Settings() {
  const activeTab = useSelector(selectActiveSettingsTab);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const tabsSideSpace = 'size-400';

  const handleSelection = (key: Key) => {
    dispatch(settingsTabSelected(key as SettingsTabKey));
  };

  type TabItem = {
    id: SettingsTabKey;
    textId: string;
    children: ReactElement;
  };

  const tabsItems: TabItem[] = [
    {
      id: 'language',
      textId: 'settings.tab.language',
      children: <LanguageSettings />,
    },
    {
      id: 'toolbar',
      textId: 'settings.tab.toolbar',
      children: <ToolbarSettings />,
    },
  ];

  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={handleSelection}
      items={tabsItems}
      orientation={isMobile ? 'horizontal' : 'vertical'}
      aria-labelledby="settings-heading"
    >
      <View>
        <Heading id="settings-heading" level={2} marginTop={0}>
          <FormattedMessage id="settings.heading" />
        </Heading>
        <TabList
          marginEnd={isMobile ? 0 : tabsSideSpace}
          marginBottom={isMobile ? tabsSideSpace : 0}
          minWidth="size-1000"
        >
          {(item: TabItem) => (
            <Item>
              <FormattedMessage id={item.textId} />
            </Item>
          )}
        </TabList>
      </View>
      <View flexGrow={1}>
        <TabPanels>{(item: TabItem) => <Item>{item.children}</Item>}</TabPanels>
      </View>
    </Tabs>
  );
}
