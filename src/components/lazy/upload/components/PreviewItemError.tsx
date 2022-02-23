import { Content, ContextualHelp, Text } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';
import { FormattedMessage, useIntl } from 'react-intl';

import { acceptedFileTypes, Upload, UploadValidityError } from '~/components/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemError({ upload }: Props) {
  const { formatList } = useIntl();

  const acceptedFileExtensions = acceptedFileTypes.map((type) =>
    type.split('/')[1].toUpperCase()
  );

  const acceptedFileTypesFormattedList = formatList(acceptedFileExtensions, {
    type: 'disjunction',
    style: 'long',
  });

  const errorsOrder: UploadValidityError[] = [
    'fileTypeWrong',
    'exifUnreadable',
    'missingCoords',
    'missingDate',
  ];

  const error = upload.validityErrors
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
      <ContextualHelp variant="info">
        <Content>
          <Text>
            <FormattedMessage
              id={`upload.error.${error}.description`}
              values={{ acceptedFileTypesFormattedList }}
            />
          </Text>
        </Content>
      </ContextualHelp>
    </>
  );
}
