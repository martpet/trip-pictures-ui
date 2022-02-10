import { Item, Text } from '@adobe/react-spectrum';
import { ActionMenu } from '@react-spectrum/menu';
import IconClose from '@spectrum-icons/workflow/CloseCircle';
import RotateIcon from '@spectrum-icons/workflow/RotateRight';
import { Key, ReactElement, useContext } from 'react';
import { useIntl } from 'react-intl';

import { Upload, UploadContext } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageActions({ upload }: Props) {
  const { removeUpload, rotateImage, uploads } = useContext(UploadContext);
  const { formatMessage } = useIntl();
  const uploadIndex = uploads.indexOf(upload);

  const handleAction = (key: Key) => {
    if (key === 'delete') removeUpload(uploadIndex);
    if (key === 'rotate') rotateImage(uploadIndex);
  };

  type Entry = {
    key: Key;
    text: string;
    icon: ReactElement;
  };

  const items: Entry[] = [
    {
      key: 'delete',
      text: formatMessage({ id: 'upload.previewAction.remove' }),
      icon: <IconClose />,
    },
  ];

  if (!upload.errors.length) {
    items.push({
      key: 'rotate',
      text: formatMessage({ id: 'upload.previewAction.rotate' }),
      icon: <RotateIcon />,
    });
  }

  return (
    <ActionMenu items={items} onAction={handleAction} isQuiet>
      {(item) => (
        <Item textValue={(item as Entry).text}>
          {(item as Entry).icon}
          <Text>{(item as Entry).text}</Text>
        </Item>
      )}
    </ActionMenu>
  );
}
