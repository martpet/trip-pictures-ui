import { Button, Text } from '@adobe/react-spectrum';
import { SpectrumButtonProps } from '@react-types/button';
import AddPhotosIcon from '@spectrum-icons/workflow/AddToSelection';
import { ChangeEventHandler, useContext, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/components/Upload';

type ButtonAddPhotosProps = {
  isQuiet?: boolean;
  variant?: SpectrumButtonProps['variant'];
};

export function ButtonAddPhotos({
  isQuiet = true,
  variant = 'primary',
}: ButtonAddPhotosProps) {
  const { files, addFiles } = useContext(UploadContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickAdd = () => inputRef.current?.click();

  const handleFilesAdded: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    addFiles(currentTarget.files!);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <Button variant={variant} onPress={handleClickAdd} isQuiet={isQuiet}>
        <AddPhotosIcon />
        <Text>
          <FormattedMessage
            id="upload.button.addPhotos"
            values={{ photosCount: files.length }}
          />
        </Text>
      </Button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg"
        onChange={handleFilesAdded}
        style={{ display: 'none' }}
      />
    </>
  );
}
