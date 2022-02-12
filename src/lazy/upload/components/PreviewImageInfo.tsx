import { FormattedDate } from 'react-intl';

import { Upload } from '~/lazy/upload';

type Props = {
  upload: Upload;
};

export function PreviewImageInfo({ upload }: Props) {
  const hasError = Boolean(upload.errors.length);

  if (hasError) return null;

  return (
    <FormattedDate
      value={new Date(upload.exif.dateOriginal!)}
      year="numeric"
      month="long"
      day="2-digit"
    />
  );
}
