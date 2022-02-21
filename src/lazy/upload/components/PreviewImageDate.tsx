import { FormattedDate, FormattedTime } from 'react-intl';

import { Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageDate({ upload }: Props) {
  const hasError = Boolean(upload.errors.length);
  const date = new Date(upload.exif.dateOriginal!);

  if (hasError) return null;

  return (
    <>
      <FormattedDate value={date} /> <FormattedTime value={date} />
    </>
  );
}
