import { Flex } from '@adobe/react-spectrum';

import { Controls, MapGL } from '~/components';
import { mapInnerContainerId, sideSpace } from '~/consts';
import { useIOSAddressbarHeight } from '~/hooks';

import styles from './Map.module.css';

export function Map() {
  const innerContainerHeight = `calc(100% - ${useIOSAddressbarHeight()}px)`;

  return (
    <MapGL>
      <Flex height={innerContainerHeight} UNSAFE_className={styles.container}>
        <Flex
          id={mapInnerContainerId}
          alignItems="end"
          justifyContent="end"
          flexGrow={1}
          margin={sideSpace}
        >
          <Controls />
        </Flex>
      </Flex>
    </MapGL>
  );
}
