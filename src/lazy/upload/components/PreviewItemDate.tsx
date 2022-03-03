import { FormattedDate, FormattedTime } from 'react-intl';

import { Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewItemDate({ upload }: Props) {
  const isValid = upload.validityErrors.length === 0;
  const date = new Date(upload.exif.dateOriginal!);

  if (!isValid) return null;

  return (
    <>
      <FormattedDate value={date} /> <FormattedTime value={date} />
    </>
  );
}
