import { Flex } from '@adobe/react-spectrum';

import { AddPhotosButton, UploadProvider } from '~/components/Upload';

export function Upload() {
  return (
    <UploadProvider>
      <Flex justifyContent="end">
        <AddPhotosButton />
      </Flex>
    </UploadProvider>
  );
}
