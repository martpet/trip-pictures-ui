import { ButtonGroup } from '@adobe/react-spectrum';

import { ButtonCloseDialog, ButtonStartUpload } from '~/lazy/upload';

export function DialogButtons() {
  return (
    <ButtonGroup>
      <ButtonCloseDialog />
      <ButtonStartUpload />
    </ButtonGroup>
  );
}
