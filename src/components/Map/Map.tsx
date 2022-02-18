import { Flex } from '@adobe/react-spectrum';

import { MapControls, MapGL } from '~/components';
import { mapInnerContainerId, sideSpace } from '~/consts';
import { useIOSAddressbarHeight } from '~/hooks';

import styles from './Map.module.css';

export function Map() {
  const contentHeight = `calc(100% - ${useIOSAddressbarHeight()}px)`;

  return (
    <MapGL>
      <Flex height={contentHeight} UNSAFE_className={styles.container}>
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
