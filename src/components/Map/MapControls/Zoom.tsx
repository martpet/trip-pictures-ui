import { ActionGroup, Item, Text } from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Remove from '@spectrum-icons/workflow/Remove';
import { Key } from 'react';
import { FormattedMessage } from 'react-intl';

export function Zoom() {
  const zoomCSSSelectors: Record<Key, string> = {
    zoomin: '.mapboxgl-ctrl-zoom-in',
    zoomout: '.mapboxgl-ctrl-zoom-out',
  };

  const handleClick = (key: Key) => {
    const mapboxControl = document.querySelector(zoomCSSSelectors[key]) as HTMLDivElement;
    mapboxControl.click();
  };

  return (
    <ActionGroup
      buttonLabelBehavior="hide"
      density="compact"
      onAction={handleClick}
      orientation="vertical"
    >
      <Item key="zoomin">
        <Add />
        <Text>
          <FormattedMessage id="map.control.navigation.zoomInLabel" />
        </Text>
      </Item>
      <Item key="zoomout">
        <Remove />
        <Text>
          <FormattedMessage id="map.control.navigation.zoomOutLabel" />
        </Text>
      </Item>
    </ActionGroup>
  );
}
