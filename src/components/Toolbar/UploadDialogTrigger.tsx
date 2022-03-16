import { ActionButton, DialogTrigger } from '@adobe/react-spectrum';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';

import { Loader } from '~/components';
import { useIsMobile } from '~/hooks';

const uploadDialogPromise = import('~/lazyload/upload');
const UploadDialog = lazy(() => uploadDialogPromise);

export function UploadDialogTrigger() {
  const [isOpen, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const dialogType = isMobile ? 'fullscreenTakeover' : 'fullscreen';
  const { formatMessage } = useIntl();

  const handlePress = () => setOpen(true);

  return (
    <DialogTrigger type={dialogType} isOpen={isOpen}>
      <ActionButton
        onPress={handlePress}
        isQuiet
        aria-label={formatMessage({ id: 'toolbar.button.upload' })}
      >
        <UploadIcon />
      </ActionButton>
      <Suspense fallback={<Loader />}>
        <UploadDialog isOpen={isOpen} setOpen={setOpen} />
      </Suspense>
    </DialogTrigger>
  );
}
