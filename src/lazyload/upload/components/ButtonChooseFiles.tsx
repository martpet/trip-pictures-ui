import { Button, Text } from '@adobe/react-spectrum';
import { SpectrumButtonProps } from '@react-types/button';
import IconAdd from '@spectrum-icons/workflow/AddToSelection';
import { ChangeEventHandler, useContext, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { acceptedFileTypes, UploadContext } from '~/lazyload/upload';

type Props = Partial<SpectrumButtonProps>;

export function ButtonChooseFiles({
  isQuiet = true,
  variant = 'primary',
  ...butonProps
}: Props) {
  const { uploads, addUploads, isUploadStarted } = useContext(UploadContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileChooserOpenRef = useRef(false);

  const handlePress = () => {
    inputRef.current?.click();
    fileChooserOpenRef.current = true;
  };

  const handleFiles: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    addUploads(currentTarget.files!);
    inputRef.current!.value = '';
  };

  return (
    <>
      <Button
        variant={variant}
        onPress={handlePress}
        isQuiet={isQuiet}
        isDisabled={isUploadStarted}
        {...butonProps}
      >
        <IconAdd />
        <Text>
          <FormattedMessage
            id="upload.buttonChooseFiles"
            values={{ count: uploads.length }}
          />
        </Text>
      </Button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedFileTypes.join(',')}
        onChange={handleFiles}
        style={{ display: 'none' }}
      />
    </>
  );
}
