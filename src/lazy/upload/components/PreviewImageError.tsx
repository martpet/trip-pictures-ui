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
  const fileTypes = acceptedMimeTypes.map((mime) => mime.split('/')[1].toUpperCase());

  const formattedFileTypesList = new Intl.ListFormat(lang, {
    style: 'long',
    type: 'disjunction',
  }).format(fileTypes);

  const errorsOrder: UploadError[] = [
    'fileTypeWrong',
    'exifUnreadable',
    'missingCoords',
    'missingCreationDate',
  ];

  const error = upload.errors
    .slice()
    .sort((a, b) => errorsOrder.indexOf(a) - errorsOrder.indexOf(b))[0];

  if (!error) return null;

  return (
    <>
      <AlertIcon color="negative" size="S" marginEnd="size-150" />
      <FormattedMessage
        id={`upload.error.${error}`}
        values={{ formattedFileTypesList }}
      />
      <HelpIcon size="S" marginStart="size-75" />
    </>
  );
}
