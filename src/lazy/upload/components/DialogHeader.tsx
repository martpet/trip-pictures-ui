import { Header, Heading } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIsMobile } from '~/hooks';
import { ButtonAddPhotos, UploadContext } from '~/lazy/upload';

export function DialogHeader() {
  const isMobile = useIsMobile();
  const { uploads } = useContext(UploadContext);

  return (
    <>
      <Heading>
        <FormattedMessage id="upload.heading" />
      </Heading>
      <Header>{!isMobile && !!uploads.length && <ButtonAddPhotos />}</Header>
    </>
  );
}
