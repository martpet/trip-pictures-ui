import { Heading, Item, TabList, TabPanels, Tabs, View } from '@adobe/react-spectrum';
import { Key, ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { useIsMobile } from '~/hooks';
import { ColorSettings, LanguageSettings, ToolbarSettings } from '~/lazyload/settings';
import { selectActiveSettingsMenu, settingsMenuSelected } from '~/slices';
import { SettingsMenu } from '~/types';

export function Settings() {
  const activeTab = useSelector(selectActiveSettingsMenu);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const tabsSideSpace = 'size-400';
  const headingId = 'settings-heading';

  const handleTabSelect = (key: Key) => {
    dispatch(settingsMenuSelected(key as SettingsMenu));
  };

  type MenuItem = {
    id: SettingsMenu;
    label: string;
    content: ReactElement;
  };

  const items: MenuItem[] = [
    {
      id: 'language',
      label: formatMessage({ id: 'settings.tab.language' }),
      content: <LanguageSettings />,
    },
    {
      id: 'color',
      label: formatMessage({ id: 'settings.tab.color' }),
      content: <ColorSettings />,
    },
    {
      id: 'toolbar',
      label: formatMessage({ id: 'settings.tab.toolbar' }),
      content: <ToolbarSettings />,
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
          {({ label }: MenuItem) => <Item>{label}</Item>}
        </TabList>
      </View>
      <View flexGrow={1}>
        <TabPanels>{({ content }: MenuItem) => <Item>{content}</Item>}</TabPanels>
      </View>
    </Tabs>
  );
}
