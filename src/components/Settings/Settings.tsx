import { Heading, Item, TabList, TabPanels, Tabs, View } from '@adobe/react-spectrum';
import { Key, ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { ChooseLanguage, ToolbarPosition } from '~/components/Settings';
import { useIsMobile } from '~/hooks';
import { selectActiveSettingsMenu, settingsMenuSelected } from '~/slices';
import { SettingsMenuKey } from '~/types';

export function Settings() {
  const activeTab = useSelector(selectActiveSettingsMenu);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const tabsSideSpace = 'size-400';
  const headingId = 'settings-heading';

  const handleTabSelect = (key: Key) => {
    dispatch(settingsMenuSelected(key as SettingsMenuKey));
  };

  type TabItem = {
    id: SettingsMenuKey;
    label: string;
    content: ReactElement;
  };

  const tabItems: TabItem[] = [
    {
      id: 'language',
      label: formatMessage({ id: 'settings.tab.language' }),
      content: <ChooseLanguage />,
    },
    {
      id: 'toolbar',
      label: formatMessage({ id: 'settings.tab.toolbar' }),
      content: <ToolbarPosition />,
    },
  ];

  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={handleTabSelect}
      items={tabItems}
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
          {({ label }: TabItem) => <Item>{label}</Item>}
        </TabList>
      </View>
      <View flexGrow={1}>
        <TabPanels>{({ content }: TabItem) => <Item>{content}</Item>}</TabPanels>
      </View>
    </Tabs>
  );
}
