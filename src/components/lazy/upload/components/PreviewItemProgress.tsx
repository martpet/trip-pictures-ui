import { ProgressBar } from '@adobe/react-spectrum';
import { IconProps } from '@react-spectrum/icon';
import IconCheckmark from '@spectrum-icons/workflow/Checkmark';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Upload } from '~/components/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemProgress({ upload }: Props) {
  const { formatMessage } = useIntl();
  let label: ReactNode = formatMessage({ id: 'upload.progressLabel' });
  const iconSize: IconProps['size'] = 'S';

  if (upload.isComplete) label = <IconCheckmark size={iconSize} color="positive" />;
  if (upload.isFailed) label = <IconCheckmark size={iconSize} color="negative" />;

  return <ProgressBar width="100%" label={label} value={upload.progress} size="S" />;
}
