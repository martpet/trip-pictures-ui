import { ActionGroup, Item, Text } from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Remove from '@spectrum-icons/workflow/Remove';
import { Key } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMap } from 'react-map-gl';

export function Zoom() {
  const { current: map } = useMap();

  const handleClick = (key: Key) => {
    if (key === 'zoomIn') {
      map?.zoomIn();
    } else {
      map?.zoomOut();
    }
  };

  return (
    <ActionGroup
      buttonLabelBehavior="hide"
      density="compact"
      onAction={handleClick}
      orientation="vertical"
    >
      <Item key="zoomIn">
        <Add />
        <Text>
          <FormattedMessage id="map.control.navigation.zoomInLabel" />
        </Text>
      </Item>
      <Item key="zoomOut">
        <Remove />
        <Text>
          <FormattedMessage id="map.control.navigation.zoomOutLabel" />
        </Text>
      </Item>
    </ActionGroup>
  );
}
