/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type AddTenancyDocumentDtoSource = typeof AddTenancyDocumentDtoSource[keyof typeof AddTenancyDocumentDtoSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AddTenancyDocumentDtoSource = {
  EMAIL: 'EMAIL',
  UPLOAD: 'UPLOAD',
  SEEK: 'SEEK',
} as const;
