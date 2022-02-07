import { Item, Text } from '@adobe/react-spectrum';
import { ActionMenu } from '@react-spectrum/menu';
import IconClose from '@spectrum-icons/workflow/CloseCircle';
import RotateLeftIcon from '@spectrum-icons/workflow/RotateLeft';
import { Key, ReactElement, useContext } from 'react';
import { useIntl } from 'react-intl';

import { UploadContext } from '~/components/Upload';

type Props = {
  fileIndex: number;
};

export function PreviewImageActions({ fileIndex }: Props) {
  const { removeUpload, rotateImage, uploads } = useContext(UploadContext);
  const { formatMessage } = useIntl();
  const { canUpload } = uploads[fileIndex];

  const handleAction = (key: Key) => {
    if (key === 'delete') removeUpload(fileIndex);
    if (key === 'rotate') rotateImage(fileIndex);
  };

  type ActionItem = {
    key: Key;
    text: string;
    icon: ReactElement;
  };

  const items: ActionItem[] = [
    {
      key: 'delete',
      text: formatMessage({ id: 'upload.preview.remove' }),
      icon: <IconClose />,
    },
  ];

  if (canUpload) {
    items.push({
      key: 'rotate',
      text: formatMessage({ id: 'upload.preview.rotate' }),
      icon: <RotateLeftIcon />,
    });
  }

  return (
    <ActionMenu items={items} onAction={handleAction}>
      {(item) => (
        <Item textValue={(item as ActionItem).text}>
          {(item as ActionItem).icon}
          <Text>{(item as ActionItem).text}</Text>
        </Item>
      )}
    </ActionMenu>
  );
}
