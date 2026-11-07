/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PayResponseDtoStatus = typeof PayResponseDtoStatus[keyof typeof PayResponseDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PayResponseDtoStatus = {
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  LATE: 'LATE',
} as const;
