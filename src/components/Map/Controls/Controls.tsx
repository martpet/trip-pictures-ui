import { Flex } from '@adobe/react-spectrum';

import { Compass, Geolocate, Pitch, Zoom } from '~/components';

export function Controls() {
  return (
    <Flex direction="column" gap="size-75">
      <Pitch />
      <Compass />
      <Geolocate />
      <Zoom />
    </Flex>
  );
}
