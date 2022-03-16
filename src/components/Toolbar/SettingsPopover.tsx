import { ActionButton, Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import SettingsIcon from '@spectrum-icons/workflow/Settings';
import { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';

import { Loader } from '~/components';

const settingsPromise = import('~/lazyload/settings');
const Settings = lazy(() => settingsPromise);

export function SettingsPopover() {
  const [isOpen, setOpen] = useState(false);
  const { formatMessage } = useIntl();

  return (
    <DialogTrigger type="popover" isOpen={isOpen} onOpenChange={setOpen}>
      <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.settings' })}>
        <SettingsIcon />
      </ActionButton>
      <Dialog size="L">
        <Content>
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
