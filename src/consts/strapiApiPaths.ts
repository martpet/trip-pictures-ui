export const strapiApiPaths = {
  oauthConnect: 'connect/:provider',
  oauthCallback: 'auth/:provider/callback',
  me: 'users/me',
  mySettings: 'users/me/settings',
  presignedPhotoUploadUrls: 'photos/presigned-upload-urls',
  photos: 'photos',
} as const;
