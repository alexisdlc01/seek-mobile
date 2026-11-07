/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type UploadControllerGetPresignedUrlFileType = typeof UploadControllerGetPresignedUrlFileType[keyof typeof UploadControllerGetPresignedUrlFileType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UploadControllerGetPresignedUrlFileType = {
  'image/jpeg': 'image/jpeg',
  'image/png': 'image/png',
  'image/webp': 'image/webp',
  'image/gif': 'image/gif',
  'image/heic': 'image/heic',
  'image/heif': 'image/heif',
  'application/pdf': 'application/pdf',
} as const;
