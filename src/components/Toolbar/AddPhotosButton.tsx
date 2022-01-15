import { ActionButton, Button, DialogTrigger } from '@adobe/react-spectrum';
import IconAdd from '@spectrum-icons/workflow/Add';
import { FormattedMessage } from 'react-intl';

import { UploadDialog } from '~/components';
import { useIsTopToolbar } from '~/hooks';

export function AddPhotosButton() {
  const isTopBar = useIsTopToolbar();

  const largeButton = (
    <Button variant="secondary" isQuiet>
      <FormattedMessage id="button.addPhotos" />
    </Button>
  );

  const compactButton = (
    <ActionButton>
      <IconAdd />
    </ActionButton>
  );

  const button = isTopBar ? largeButton : compactButton;

  return (
    <DialogTrigger type="popover">
      {button}
      <UploadDialog />
    </DialogTrigger>
  );
}
