import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import CompassIcon from '@spectrum-icons/workflow/Compass';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { selectMapViewport } from '~/slices';

export function Compass() {
  const viewport = useSelector(selectMapViewport);
  const mapboxControlSelector = '.mapboxgl-ctrl-compass';

  const handlePress = () => {
    const mapboxControl = document.querySelector(mapboxControlSelector) as HTMLDivElement;
    mapboxControl.click();
  };

  return !viewport?.bearing ? null : (
    <TooltipTrigger>
      <ActionButton onPress={handlePress}>
        <CompassIcon />
      </ActionButton>
      <Tooltip>
        <FormattedMessage id="map.control.navigation.compassLabel" />
      </Tooltip>
    </TooltipTrigger>
  );
}
