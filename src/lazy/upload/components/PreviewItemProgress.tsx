import { ProgressBar } from '@adobe/react-spectrum';
import { IconProps } from '@react-spectrum/icon';
import IconAlert from '@spectrum-icons/workflow/Alert';
import IconCheckmark from '@spectrum-icons/workflow/Checkmark';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Upload } from '~/lazy/upload';

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
  let label: ReactNode = formatMessage({ id: 'upload.progressLabel' });

  if (upload.isComplete) label = <IconCheckmark {...iconProps} color="positive" />;
  if (upload.isFailed) label = <IconAlert {...iconProps} color="negative" />;

  return (
    <ProgressBar
      width="100%"
      marginBottom="size-150"
      label={label}
      value={upload.progress}
      size="S"
    />
  );
}
