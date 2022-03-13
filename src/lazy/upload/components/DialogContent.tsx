import { Content, IllustratedMessage, View } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { LoginButton } from '~/components';
import { DropZone, Preview } from '~/lazy/upload';
import { selectCurrentUser } from '~/slices';

export function DialogContent() {
  const user = useSelector(selectCurrentUser);

  return (
    <Content>
      {!user && (
        <IllustratedMessage>
          <Content>
            <View marginBottom="size-200">
              <FormattedMessage id="upload.loginDescription" />
            </View>
            <LoginButton />
          </Content>
        </IllustratedMessage>
      )}

      {user && (
        <DropZone>
          <Preview />
        </DropZone>
      )}
    </Content>
  );
}
