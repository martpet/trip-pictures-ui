import { Flex, View } from '@adobe/react-spectrum';
import {
  GeolocateControl as MapboxGeolocateControl,
  NavigationControl as MapboxNavigationControl,
} from 'react-map-gl';

import { Compass, Geolocate, Zoom } from '~/components';

export function Controls() {
  return (
    <Flex direction="column" gap="size-75">
      <Compass />
      <Geolocate />
      <Zoom />
      <View isHidden>
        <MapboxGeolocateControl />
        <MapboxNavigationControl />
      </View>
    </Flex>
  );
}
