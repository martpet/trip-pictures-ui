import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import CompassIcon from '@spectrum-icons/workflow/Compass';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { MapContext } from 'react-map-gl';

export function Compass() {
  const { viewport } = useContext(MapContext);
  const compassCSSSelector = '.mapboxgl-ctrl-compass';

  const handlePress = () => {
    const mapboxControl = document.querySelector(compassCSSSelector) as HTMLDivElement;
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
