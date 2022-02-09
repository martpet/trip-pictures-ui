import { Flex, View } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  acceptedMimeTypes,
  PreviewImageActions,
  Upload,
  UploadError,
} from '~/lazy/upload';
import { selectLang } from '~/slices';

type Props = {
  upload: Upload;
};

export function PreviewImageHeader({ upload }: Props) {
  const { errors } = upload;
  const lang = useSelector(selectLang);
  const acceptedFileTypes = acceptedMimeTypes.map((mime) =>
    mime.split('/')[1].toUpperCase()
  );
  const formattedFileTypesList = new Intl.ListFormat(lang, {
    style: 'long',
    type: 'disjunction',
  }).format(acceptedFileTypes);

  const sortedErrors: UploadError[] = [
    'fileTypeWrong',
    'exifUnreadable',
    'missingCoords',
  ];

  const error = errors
    .slice()
    .sort((a, b) => sortedErrors.indexOf(a) - sortedErrors.indexOf(b))[0];

  return (
    <View
      height="size-500"
      paddingX="size-100"
      backgroundColor="gray-50"
      UNSAFE_style={{ color: 'var(--spectrum-global-color-gray-800)' }}
    >
      <Flex height="100%" alignItems="center">
        {error && (
          <>
            <AlertIcon color="negative" size="S" marginEnd="size-150" />
            <FormattedMessage
              id={`upload.error.${error}`}
              values={{ fileTypesList: formattedFileTypesList }}
            />
          </>
        )}
        <View marginStart="auto">
          <PreviewImageActions upload={upload} />
        </View>
      </Flex>
    </View>
  );
}
