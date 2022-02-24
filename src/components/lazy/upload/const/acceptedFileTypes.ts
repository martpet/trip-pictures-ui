import { isSafari } from '~/consts';

export const acceptedFileTypes = ['image/jpeg'];

if (!isSafari) {
  acceptedFileTypes.push('image/heic');
}

// Safari uploads heic as jpeg
