/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CreateContractDtoSource = typeof CreateContractDtoSource[keyof typeof CreateContractDtoSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateContractDtoSource = {
  EMAIL: 'EMAIL',
  UPLOAD: 'UPLOAD',
  SEEK: 'SEEK',
} as const;
