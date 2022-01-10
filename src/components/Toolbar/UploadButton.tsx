import { ActionButton, Text } from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import { FormattedMessage } from 'react-intl';

import { useToolbarPosition } from '~/hooks';

export function UploadButton() {
  const topBar = useToolbarPosition() === 'top';

  return (
    <ActionButton>
      <Add />
      {topBar && (
        <Text>
          <FormattedMessage id="button.addImages" />
        </Text>
      )}
    </ActionButton>
  );
}
