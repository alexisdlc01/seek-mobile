/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ContractSource = typeof ContractSource[keyof typeof ContractSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContractSource = {
  EMAIL: 'EMAIL',
  UPLOAD: 'UPLOAD',
  SEEK: 'SEEK',
} as const;
