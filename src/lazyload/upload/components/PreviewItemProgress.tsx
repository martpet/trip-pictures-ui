import { ProgressBar } from '@adobe/react-spectrum';
import { IconProps } from '@react-spectrum/icon';
import IconAlert from '@spectrum-icons/workflow/Alert';
import IconCheckmark from '@spectrum-icons/workflow/Checkmark';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Upload } from '~/lazyload/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemProgress({ upload }: Props) {
  const { formatMessage } = useIntl();
  const iconProps: Partial<IconProps> = {
    size: 'S',
    position: 'absolute',
    marginTop: '-7px',
  };
  const progressBarValue = upload.transferCompleted ? 100 : upload.progress;

  let progressBarLabel: ReactNode = formatMessage({ id: 'upload.progressLabel' });
  if (upload.transferCompleted) {
    progressBarLabel = <IconCheckmark {...iconProps} color="positive" />;
  } else if (upload.transferFailed) {
    progressBarLabel = <IconAlert {...iconProps} color="negative" />;
  }

  return (
    <ProgressBar
      value={progressBarValue}
      label={progressBarLabel}
      size="S"
      width="100%"
      marginEnd="size-100"
    />
  );
}
