import { Content, Heading, IllustratedMessage, View } from '@adobe/react-spectrum';
import UploadIllustration from '@spectrum-icons/illustrations/Upload';
import { FormattedMessage } from 'react-intl';

import { ButtonChooseFiles } from '~/components/lazy/upload';

export function DropZoneIllustration() {
  return (
    <IllustratedMessage>
      <UploadIllustration />
      <Heading>
        <FormattedMessage id="upload.dropZone.heading" />
      </Heading>
      <Content>
        <FormattedMessage id="upload.dropZone.subHeading" />
        <View marginTop="size-600">
          <ButtonChooseFiles variant="cta" isQuiet={false} />
        </View>
      </Content>
    </IllustratedMessage>
  );
}
