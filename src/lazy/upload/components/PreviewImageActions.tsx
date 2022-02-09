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
  const { errors } = upload;
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
      text: formatMessage({ id: 'upload.preview.remove' }),
      icon: <IconClose />,
    },
    {
      key: 'rotate',
      text: formatMessage({ id: 'upload.preview.rotate' }),
      icon: <RotateIcon />,
    },
  ];

  if (errors.length) return null;

  return (
    <ActionMenu items={items} onAction={handleAction}>
      {(item) => (
        <Item textValue={(item as Entry).text}>
          {(item as Entry).icon}
          <Text>{(item as Entry).text}</Text>
        </Item>
      )}
    </ActionMenu>
  );
}
