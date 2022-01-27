import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as NotFoundIcon } from '~/assets/images/illustrationNotFound.svg';
import { PageContainer } from '~/components';

export function NotFound() {
  return (
    <PageContainer>
      <IllustratedMessage>
        <NotFoundIcon />
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
