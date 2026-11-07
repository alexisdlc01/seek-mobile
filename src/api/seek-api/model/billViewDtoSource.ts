/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type BillViewDtoSource = typeof BillViewDtoSource[keyof typeof BillViewDtoSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BillViewDtoSource = {
  EMAIL: 'EMAIL',
  MANUAL: 'MANUAL',
} as const;
