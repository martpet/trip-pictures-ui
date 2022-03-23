import { Header, Heading } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIsMobile } from '~/hooks';
import { ButtonChooseFiles, UploadContext } from '~/lazyload/upload';

export function DialogHeader() {
  const isMobile = useIsMobile();
  const { uploads, isUploadStarted } = useContext(UploadContext);

  return (
    <>
      <Heading>
        <FormattedMessage id="upload.heading" />
      </Heading>

      <Header>
        {!isMobile && !!uploads.length && !isUploadStarted && <ButtonChooseFiles />}
      </Header>
    </>
  );
}
