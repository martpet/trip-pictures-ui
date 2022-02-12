import { Content, View } from '@adobe/react-spectrum';
import { useSelector } from 'react-redux';

import { LoginButton } from '~/components';
import { DropZone, Preview } from '~/lazy/upload';
import { selectCurrentUser } from '~/slices';

export function DialogContent() {
  const user = useSelector(selectCurrentUser);

  return (
    <Content>
      {!user && (
        <View marginTop="size-200">
          <LoginButton />
        </View>
      )}

      {user && (
        <DropZone>
          <Preview />
        </DropZone>
      )}
    </Content>
  );
}
