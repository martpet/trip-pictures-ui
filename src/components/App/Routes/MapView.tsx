import { Flex } from '@adobe/react-spectrum';

import { Map, MapControls } from '~/components';
import { mapInnerContainerId, sideSpace } from '~/consts';
import { useIOSAddressbarHeight } from '~/hooks';

export function MapView() {
  const height = `calc(100% - ${useIOSAddressbarHeight()}px)`;

  return (
    <Map>
      <Flex height={height}>
        <Flex
          id={mapInnerContainerId}
          alignItems="end"
          justifyContent="end"
          flexGrow={1}
          margin={sideSpace}
        >
          <MapControls />
        </Flex>
      </Flex>
    </Map>
  );
}
