import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMap } from 'react-map-gl';

export function Pitch() {
  const { current: map } = useMap();
  const [pitch, setPitch] = useState(0);

  const handlePress = () => {
    map?.flyTo({ pitch: 0 });
  };

  useEffect(() => {
    if (!map) return undefined;
    const onMove = () => setPitch(map.getPitch());
    map.on('move', onMove);
    onMove();
    return () => {
      map.off('move', onMove);
    };
  }, [map]);

  if (!pitch) return null;

  return (
    <TooltipTrigger>
      <ActionButton onPress={handlePress}>
        <span style={{ position: 'absolute' }}>2D</span>
      </ActionButton>
      <Tooltip>
        <FormattedMessage id="map.control.navigation.pitchLabel" />
      </Tooltip>
    </TooltipTrigger>
  );
}
