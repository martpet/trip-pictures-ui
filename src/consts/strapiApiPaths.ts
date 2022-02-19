export const strapiApiPaths = {
  oauthConnect: 'connect/:provider',
  oauthCallback: 'auth/:provider/callback',
  me: 'users/me',
  mySettings: 'users/me/settings',
  generatePhotoUploadUrls: 'photos/generate-photo-upload-urls',
  photos: 'photos',
} as const;
