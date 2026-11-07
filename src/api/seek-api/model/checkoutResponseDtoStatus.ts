/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CheckoutResponseDtoStatus = typeof CheckoutResponseDtoStatus[keyof typeof CheckoutResponseDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CheckoutResponseDtoStatus = {
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  LATE: 'LATE',
} as const;
