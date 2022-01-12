import { ActionButton, Button } from '@adobe/react-spectrum';
import IconAdd from '@spectrum-icons/workflow/Add';
import { useIntl } from 'react-intl';

import { useToolbarPosition } from '~/hooks';

export function AddPhotosButton() {
  const { formatMessage } = useIntl();
  const text = formatMessage({ id: 'button.addPhotos' });
  const isTopBar = useToolbarPosition() === 'top';

  const textButton = (
    <Button variant="secondary" isQuiet>
      {text}
    </Button>
  );

  const iconButton = (
    <ActionButton>
      <IconAdd />
    </ActionButton>
  );

  return isTopBar ? textButton : iconButton;
}
