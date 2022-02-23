import { Header, Heading } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonAddFiles, UploadContext } from '~/components/lazy/upload';
import { useIsMobile } from '~/hooks';

export function DialogHeader() {
  const isMobile = useIsMobile();
  const { uploads } = useContext(UploadContext);

  return (
    <>
      <Heading>
        <FormattedMessage id="upload.heading" />
      </Heading>
      <Header>{!isMobile && !!uploads.length && <ButtonAddFiles />}</Header>
    </>
  );
}
