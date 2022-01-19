import { ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import SettingsIcon from '@spectrum-icons/workflow/Settings';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { SettingsDialog } from '~/components/Settings';
import { selectToolbarPosition } from '~/slices';

export function SettingsDialogTrigger() {
  const [open, setOpen] = useState(false);
  const toolbarPosition = useSelector(selectToolbarPosition);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setOpen(false);
  }, [toolbarPosition]);

  return (
    <DialogTrigger type="popover" isOpen={open} onOpenChange={setOpen}>
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.settings' })}>
        <SettingsIcon />
      </ActionButton>
      <SettingsDialog />
    </DialogTrigger>
  );
}