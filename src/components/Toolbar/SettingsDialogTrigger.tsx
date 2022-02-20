import { ActionButton } from '@adobe/react-spectrum';
import SettingsIcon from '@spectrum-icons/workflow/Settings';
import { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';

const SettingsDialog = lazy(() => import('~/lazy/settings'));

export function SettingsDialogTrigger() {
  const [isOpen, setOpen] = useState(false);
  const { formatMessage } = useIntl();

  const button = (
    <ActionButton isQuiet aria-label={formatMessage({ id: 'toolbar.button.settings' })}>
      <SettingsIcon />
    </ActionButton>
  );

  return (
    <Suspense fallback={null}>
      <SettingsDialog button={button} isOpen={isOpen} setOpen={setOpen} />
    </Suspense>
  );
}
