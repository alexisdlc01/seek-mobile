/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TenancyDocumentSource = typeof TenancyDocumentSource[keyof typeof TenancyDocumentSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TenancyDocumentSource = {
  EMAIL: 'EMAIL',
  UPLOAD: 'UPLOAD',
  SEEK: 'SEEK',
} as const;
