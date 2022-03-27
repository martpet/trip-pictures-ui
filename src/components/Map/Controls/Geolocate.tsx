import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import AnchorSelect from '@spectrum-icons/workflow/AnchorSelect';
import { FormattedMessage } from 'react-intl';
import { GeolocateControl } from 'react-map-gl';

export function Geolocate() {
  const mapboxControlSelector = '.mapboxgl-ctrl-geolocate';

  const handleClick = () => {
    const mapboxControl = document.querySelector(mapboxControlSelector) as HTMLDivElement;
    mapboxControl.click();
  };

  return (
    <>
      <GeolocateControl style={{ display: 'none' }} />
      <TooltipTrigger>
        <ActionButton onPress={handleClick}>
          <AnchorSelect UNSAFE_style={{ transform: 'scale(-1, 1)' }} />
        </ActionButton>
        <Tooltip>
          <FormattedMessage id="map.control.geolocate.label" />
        </Tooltip>
      </TooltipTrigger>
    </>
  );
}
