import { Button, Text } from '@adobe/react-spectrum';
import { SpectrumButtonProps } from '@react-types/button';
import IconAdd from '@spectrum-icons/workflow/AddToSelection';
import { ChangeEventHandler, useContext, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { acceptedFileTypes, UploadContext } from '~/lazy/upload';

type Props = Partial<SpectrumButtonProps>;

export function ButtonAddPhotos({
  isQuiet = true,
  variant = 'primary',
  ...butonProps
}: Props) {
  const { uploads, addUploads } = useContext(UploadContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickAdd = () => inputRef.current?.click();

  const handleFilesAdded: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    addUploads(currentTarget.files!);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <Button
        variant={variant}
        onPress={handleClickAdd}
        isQuiet={isQuiet}
        {...butonProps}
      >
        <IconAdd />
        <Text>
          <FormattedMessage
            id="upload.button.addPhotos"
            values={{ count: uploads.length }}
          />
        </Text>
      </Button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedFileTypes.join(',')}
        onChange={handleFilesAdded}
        style={{ display: 'none' }}
      />
    </>
  );
}
