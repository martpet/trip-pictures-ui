import { ActionButton, Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';
import HelpIcon from '@spectrum-icons/workflow/HelpOutline';
import { FormattedMessage, useIntl } from 'react-intl';

import { acceptedFileTypes, Upload, UploadError } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageError({ upload }: Props) {
  const { formatList } = useIntl();

  const acceptedFileExtensions = acceptedFileTypes.map((type) =>
    type.split('/')[1].toUpperCase()
  );

  const acceptedFileTypesFormattedList = formatList(acceptedFileExtensions, {
    type: 'disjunction',
    style: 'long',
  });

  const errorsOrder: UploadError[] = [
    'fileTypeWrong',
    'exifUnreadable',
    'missingCoords',
    'missingDate',
  ];

  const error = upload.errors
    .slice()
    .sort((a, b) => errorsOrder.indexOf(a) - errorsOrder.indexOf(b))[0];

  if (!error) return null;

  return (
    <>
      <AlertIcon color="notice" size="S" marginEnd="size-125" />
      <FormattedMessage
        id={`upload.error.${error}`}
        values={{ acceptedFileTypesFormattedList }}
      />
      <DialogTrigger type="popover">
        <ActionButton isQuiet>
          <HelpIcon size="S" />
        </ActionButton>
        <Dialog>
          <Content>
            <FormattedMessage
              id={`upload.error.${error}.description`}
              values={{ acceptedFileTypesFormattedList }}
            />
          </Content>
        </Dialog>
      </DialogTrigger>
    </>
  );
}
