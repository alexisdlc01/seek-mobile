/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type LandlordPaymentRowDtoStatus = typeof LandlordPaymentRowDtoStatus[keyof typeof LandlordPaymentRowDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LandlordPaymentRowDtoStatus = {
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  LATE: 'LATE',
} as const;
