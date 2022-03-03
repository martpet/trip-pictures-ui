import { Header, Heading } from '@adobe/react-spectrum';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIsMobile } from '~/hooks';
import { ButtonChooseFiles, UploadContext } from '~/lazy/upload';

export function DialogHeader() {
  const isMobile = useIsMobile();
  const { uploads, isUploading } = useContext(UploadContext);

  return (
    <>
      <Heading>
        <FormattedMessage id="upload.heading" />
      </Heading>

      <Header>
        {!isMobile && !!uploads.length && !isUploading && <ButtonChooseFiles />}
      </Header>
    </>
  );
}
