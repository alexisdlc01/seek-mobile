/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type BillViewDtoStatus = typeof BillViewDtoStatus[keyof typeof BillViewDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BillViewDtoStatus = {
  DUE: 'DUE',
  PAID: 'PAID',
} as const;
