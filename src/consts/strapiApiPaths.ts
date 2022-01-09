export const strapiApiPaths = {
  oauthConnect: 'connect/:provider',
  oauthCallback: 'auth/:provider/callback',
  me: 'users/me',
  mySettings: 'users/me/settings',
  generatePhotoUploadUrl: 'photos/generate-upload-url',
  photos: 'photos',
} as const;
