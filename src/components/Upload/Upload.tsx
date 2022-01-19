import { useContext } from 'react';

import { UploadContext } from '~/components';
import { AddPhotosButton } from '~/components/Upload';

export function Upload() {
  const { files } = useContext(UploadContext);

  return (
    <>
      <AddPhotosButton />
      <br />
      Selected files: {files.length}
    </>
  );
}
