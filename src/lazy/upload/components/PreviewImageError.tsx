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

  const formattedAcceptedFilesList = new Intl.ListFormat(lang, {
    style: 'long',
    type: 'disjunction',
  }).format(acceptedFileTypes);

  const errorsPriority: UploadError[] = [
    'fileTypeWrong',
    'exifUnreadable',
    'missingCoords',
    'missingDate',
  ];

  const error = upload.errors
    .slice()
    .sort((a, b) => errorsPriority.indexOf(a) - errorsPriority.indexOf(b))[0];

  if (!error) return null;

  return (
    <>
      <AlertIcon color="negative" size="S" marginEnd="size-150" />
      <FormattedMessage
        id={`upload.error.${error}`}
        values={{ formattedAcceptedFilesList }}
      />
      <HelpIcon size="S" marginStart="size-75" />
    </>
  );
}
