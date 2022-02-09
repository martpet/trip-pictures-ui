import { ActionButton, Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { Settings } from '~/lazy/settings';
import { selectToolbarPosition } from '~/slices';

type Props = {
  trigger: ReactNode;
};

export function SettingsDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const toolbarPosition = useSelector(selectToolbarPosition);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setOpen(false);
  }, [toolbarPosition]);

  return (
    <DialogTrigger type="popover" isOpen={open} onOpenChange={setOpen}>
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.settings' })}>
        {trigger}
      </ActionButton>
      <Dialog size="L">
        <Content>
          <Settings />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
