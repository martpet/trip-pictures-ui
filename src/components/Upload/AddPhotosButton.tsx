import { ActionButton, Text } from '@adobe/react-spectrum';
import AddPhotosIcon from '@spectrum-icons/workflow/AddCircle';
import { useContext, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/components/Upload';

export function AddPhotosButton() {
  const { files, setFiles } = useContext(UploadContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = () => {
    const newFiles = inputRef.current?.files!;
    setFiles([...files, ...newFiles]);
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <ActionButton onPress={handleClick}>
        <AddPhotosIcon />
        <Text>
          <FormattedMessage
            id="upload.dialog.addPhotosButton"
            values={{ photosCount: files.length }}
          />
        </Text>
      </ActionButton>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
