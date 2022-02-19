import { Content, Heading, IllustratedMessage, View } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';

import { ButtonAddFiles } from '~/lazy/upload';
import { ReactComponent as Illustration } from '~/lazy/upload/images/illustrationUpload.svg';

export function DropZoneIllustration() {
  return (
    <IllustratedMessage>
      <Illustration />
      <Heading>
        <FormattedMessage id="upload.dropZone.heading" />
      </Heading>
      <Content>
        <FormattedMessage id="upload.dropZone.subHeading" />
        <View marginTop="size-600">
          <ButtonAddFiles variant="cta" isQuiet={false} />
        </View>
      </Content>
    </IllustratedMessage>
  );
}
