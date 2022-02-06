import ExifReader from 'exifreader';
import { FormEventHandler } from 'react';

import { useGenerateUploadUrlMutation } from '~/services';

export function Upload() {
  const [generateUploadUrl] = useGenerateUploadUrlMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const file = event.currentTarget.upload.files[0];
    const tags = await ExifReader.load(file, { expanded: true });

    // eslint-disable-next-line no-console
    console.log(tags);

    return;

    const body = new FormData();
    const { fields, url } = await generateUploadUrl().unwrap();

    Object.entries(fields).forEach(([key, val]) => body.append(key, val));
    body.append('file', file);
    fetch(url, { method: 'POST', body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="upload" accept="image/jpeg" required />
      <button type="submit">Submit</button>
    </form>
  );
}
