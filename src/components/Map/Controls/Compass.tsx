import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import CompassIcon from '@spectrum-icons/workflow/Compass';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMap } from 'react-map-gl';

export function Compass() {
  const { current: map } = useMap();
  const [bearing, setBearing] = useState(0);

  const handlePress = () => {
    map?.resetNorth();
  };

  useEffect(() => {
    if (!map) return undefined;
    const onMove = () => setBearing(map.getBearing());
    map.on('move', onMove);
    onMove();
    return () => {
      map.off('move', onMove);
    };
  }, [map]);

  if (!bearing) return null;

  return (
    <TooltipTrigger>
      <ActionButton onPress={handlePress}>
        <CompassIcon UNSAFE_style={{ transform: `rotate(${bearing - 45}deg)` }} />
      </ActionButton>
      <Tooltip>
        <FormattedMessage id="map.control.navigation.bearingLabel" />
      </Tooltip>
    </TooltipTrigger>
  );
}
