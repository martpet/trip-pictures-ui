import { Flex } from '@adobe/react-spectrum';
import AlertIcon from '@spectrum-icons/workflow/Alert';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import { UploadContext } from '~/lazy/upload';

export function PreviewErrors() {
  const { uploads, invalidUploads } = useContext(UploadContext);

  if (!invalidUploads.length) return null;

  return (
    <Flex alignItems="center" marginTop="size-75" marginBottom="size-400">
      <AlertIcon color="negative" marginEnd="size-125" />
      {invalidUploads.length === uploads.length ? (
        <FormattedMessage
          id="upload.errorsOverview.allInvalid"
          values={{ count: uploads.length }}
        />
      ) : (
        <FormattedMessage
          id="upload.errorsOverview.someInvalid"
          values={{ invalidCount: invalidUploads.length }}
        />
      )}
    </Flex>
  );
}
