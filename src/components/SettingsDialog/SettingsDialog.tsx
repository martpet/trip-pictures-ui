import {
  Content,
  Dialog,
  Heading,
  Item,
  TabList,
  TabPanels,
  Tabs,
  View,
} from '@adobe/react-spectrum';
import { FC, Key } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { LanguageSettings, ToolbarSettings } from '~/components';
import { useIsMobile } from '~/hooks';
import { selectActiveSettingsTab, settingsTabSelected } from '~/slices';
import { SettingsTabKey } from '~/types';

type Tab = {
  id: SettingsTabKey;
  textId: string;
  Component: FC;
};

const tabsItems: Tab[] = [
  {
    id: 'language',
    textId: 'settings.tab.language',
    Component: LanguageSettings,
  },
  {
    id: 'toolbar',
    textId: 'settings.tab.toolbar',
    Component: ToolbarSettings,
  },
];

export function SettingsDialog() {
  const activeTab = useSelector(selectActiveSettingsTab);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const tabsSideSpace = 'size-400';

  const handleTabSelect = (key: Key) => {
    dispatch(settingsTabSelected(key as SettingsTabKey));
  };

  return (
    <Dialog size="L">
      <Content>
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={handleTabSelect}
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
            >
              {({ textId }: Tab) => (
                <Item>
                  <FormattedMessage id={textId} />
                </Item>
              )}
            </TabList>
          </View>
          <View flexGrow={1}>
            <TabPanels>
              {({ Component }: Tab) => (
                <Item>
                  <Component />
                </Item>
              )}
            </TabPanels>
          </View>
        </Tabs>
      </Content>
    </Dialog>
  );
}
