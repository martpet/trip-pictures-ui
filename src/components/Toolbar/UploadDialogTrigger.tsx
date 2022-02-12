import { ActionButton } from '@adobe/react-spectrum';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';

const UploadDialog = lazy(() => import('~/lazy/upload'));

export function UploadDialogTrigger() {
  const [isOpen, setOpen] = useState(false);
  const { formatMessage } = useIntl();

  const handlePress = () => {
    setOpen(true);
  };

  const trigger = (
    <ActionButton
      onPress={handlePress}
      isQuiet
      aria-label={formatMessage({ id: 'toolbar.button.upload' })}
    >
      <UploadIcon />
    </ActionButton>
  );

  return (
    <Suspense fallback={null}>
      <UploadDialog trigger={trigger} isOpen={isOpen} setOpen={setOpen} />
    </Suspense>
  );
}
