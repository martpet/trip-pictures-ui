import { Content, Heading, IllustratedMessage, View } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';

import { ButtonAddPhotos } from '~/lazy/upload';
import { ReactComponent as Illustration } from '~/lazy/upload/images/illustrationUpload.svg';

export function DropZoneIllustration() {
  return (
    <IllustratedMessage>
      <Illustration />
      <Heading>
        <FormattedMessage id="upload.dragAndDrop.heading" />
      </Heading>
      <Content>
        <FormattedMessage id="upload.dragAndDrop.subHeading" />
        <View marginTop="size-600">
          <ButtonAddPhotos variant="cta" isQuiet={false} />
        </View>
      </Content>
    </IllustratedMessage>
  );
}
