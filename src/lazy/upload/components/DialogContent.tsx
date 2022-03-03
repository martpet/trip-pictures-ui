import { Content, Flex } from '@adobe/react-spectrum';
import { useSelector } from 'react-redux';

import { LoginButton } from '~/components';
import { DropZone, Preview } from '~/lazy/upload';
import { selectCurrentUser } from '~/slices';

export function DialogContent() {
  const user = useSelector(selectCurrentUser);

  return (
    <Content>
      {!user && (
        <Flex height="100%" justifyContent="center" alignItems="center">
          <LoginButton />
        </Flex>
      )}

      {user && (
        <DropZone>
          <Preview />
        </DropZone>
      )}
    </Content>
  );
}
