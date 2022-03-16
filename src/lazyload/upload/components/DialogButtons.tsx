import { ButtonGroup } from '@adobe/react-spectrum';

import { ButtonCloseDialog, ButtonStartUpload } from '~/lazyload/upload';

export function DialogButtons() {
  return (
    <ButtonGroup>
      <ButtonCloseDialog />
      <ButtonStartUpload />
    </ButtonGroup>
  );
}
