import { ActionButton, Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import SettingsIcon from '@spectrum-icons/workflow/Settings';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { Settings } from '~/components';
import { selectToolbarPosition } from '~/slices';

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const toolbarPosition = useSelector(selectToolbarPosition);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setOpen(false);
  }, [toolbarPosition]);

  return (
    <DialogTrigger type="popover" isOpen={open} onOpenChange={setOpen}>
      <ActionButton isQuiet aria-label={formatMessage({ id: 'button.settings' })}>
        <SettingsIcon />
      </ActionButton>
      <Dialog size="L">
        <Content>
          <Settings />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
