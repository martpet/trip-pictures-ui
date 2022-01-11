import { ActionButton, Button } from '@adobe/react-spectrum';
import IconAdd from '@spectrum-icons/workflow/Add';
import { useIntl } from 'react-intl';

import { useIsMobile, useToolbarPosition } from '~/hooks';

export function AddPhotosButton() {
  const { formatMessage } = useIntl();
  const buttonText = formatMessage({ id: 'button.addImages' });
  const topBar = useToolbarPosition() === 'top';
  const isMobile = useIsMobile();

  const largeButton = <Button variant="secondary">{buttonText}</Button>;

  const compactButton = (
    <ActionButton>
      <IconAdd />
    </ActionButton>
  );

  return topBar && !isMobile ? largeButton : compactButton;
}
