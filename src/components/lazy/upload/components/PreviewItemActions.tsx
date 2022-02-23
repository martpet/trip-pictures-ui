import { Item, Text } from '@adobe/react-spectrum';
import { ActionMenu } from '@react-spectrum/menu';
import IconClose from '@spectrum-icons/workflow/CloseCircle';
import RotateIcon from '@spectrum-icons/workflow/RotateLeftOutline';
import { Key, ReactElement, useContext } from 'react';
import { useIntl } from 'react-intl';

import { Upload, UploadContext } from '~/components/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemActions({ upload }: Props) {
  const { removeUpload, rotateImage } = useContext(UploadContext);
  const { formatMessage } = useIntl();

  const handleAction = (key: Key) => {
    if (key === 'delete') removeUpload(upload.id);
    if (key === 'rotate') rotateImage(upload.id);
  };

  type Entry = {
    key: Key;
    label: string;
    icon: ReactElement;
    skip?: boolean;
  };

  const items: Entry[] = [
    {
      key: 'delete',
      label: formatMessage({ id: 'upload.previewAction.remove' }),
      icon: <IconClose />,
    },
    {
      key: 'rotate',
      label: formatMessage({ id: 'upload.previewAction.rotate' }),
      icon: <RotateIcon />,
      skip: !upload.canRotate,
    },
  ];

  return (
    <ActionMenu items={items.filter(({ skip }) => !skip)} onAction={handleAction} isQuiet>
      {(item) => (
        <Item textValue={(item as Entry).label}>
          {(item as Entry).icon}
          <Text>{(item as Entry).label}</Text>
        </Item>
      )}
    </ActionMenu>
  );
}
