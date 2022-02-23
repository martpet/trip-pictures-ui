import { isSafari } from '~/consts';

export const acceptedFileTypes = ['image/jpeg'];

// Safari automatically converts jpeg to heic
if (!isSafari) {
  acceptedFileTypes.push('image/heic');
}
