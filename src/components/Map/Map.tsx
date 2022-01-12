import { Flex } from '@adobe/react-spectrum';

import { MapControls, MapGL } from '~/components';
import { mapInnerContainerId, sideSpace } from '~/consts';
import { useIOSAddressbarHeight } from '~/hooks';

export function Map() {
  const contentHeight = `calc(100% - ${useIOSAddressbarHeight()}px)`;

  return (
    <MapGL>
      <Flex height={contentHeight}>
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
    </MapGL>
  );
}
