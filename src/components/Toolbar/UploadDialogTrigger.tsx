import { ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';

import { useIsMobile } from '~/hooks';

const UploadDialog = lazy(() => import('~/lazy/upload'));

export function UploadDialogTrigger() {
  const [isOpen, setOpen] = useState(false);
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  const dialogType = isMobile ? 'fullscreenTakeover' : 'fullscreen';

  const handlePress = () => setOpen(true);

  return (
    <Suspense fallback={null}>
      <DialogTrigger type={dialogType} isOpen={isOpen}>
        <ActionButton
          onPress={handlePress}
          isQuiet
          aria-label={formatMessage({ id: 'toolbar.button.upload' })}
        >
          <UploadIcon />
        </ActionButton>
        <UploadDialog isOpen={isOpen} setOpen={setOpen} />
      </DialogTrigger>
    </Suspense>
  );
}
