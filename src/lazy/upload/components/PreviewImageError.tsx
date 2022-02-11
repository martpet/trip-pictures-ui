import { ActionButton, Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';
import HelpIcon from '@spectrum-icons/workflow/HelpOutline';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { acceptedMimeTypes, Upload, UploadError } from '~/lazy/upload';
import { selectLang } from '~/slices';

type Props = {
  upload: Upload;
};

export function PreviewImageError({ upload }: Props) {
  const lang = useSelector(selectLang);

  const acceptedFileTypes = acceptedMimeTypes.map((type) =>
    type.split('/')[1].toUpperCase()
  );

  const acceptedFileTypesFormattedList = new Intl.ListFormat(lang, {
    style: 'long',
    type: 'disjunction',
  }).format(acceptedFileTypes);

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
      <AlertIcon color="negative" size="S" marginEnd="size-175" />
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
