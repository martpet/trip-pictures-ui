import { FormEventHandler } from 'react';

import { useCreatePresignedPhotoUploadUrlsMutation } from '~/services';

export function Upload() {
  const [generateUploadUrls] = useCreatePresignedPhotoUploadUrlsMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const file = event.currentTarget.upload.files[0];

    const body = new FormData();
    const [{ fields, url }] = await generateUploadUrls({ uploadsLength: 5 }).unwrap();

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
