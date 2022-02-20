import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import NotFoundllustration from '@spectrum-icons/illustrations/NotFound';
import { FormattedMessage } from 'react-intl';

import { PageContainer } from '~/components';

export function NotFound() {
  return (
    <PageContainer>
      <IllustratedMessage>
        <NotFoundllustration />
        <Heading>
          <FormattedMessage id="page.notFound.heading" />
        </Heading>
        <Content>
          <FormattedMessage id="page.notFound.content" />
        </Content>
      </IllustratedMessage>
    </PageContainer>
  );
}
