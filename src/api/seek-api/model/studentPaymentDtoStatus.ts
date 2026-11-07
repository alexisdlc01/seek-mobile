/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type StudentPaymentDtoStatus = typeof StudentPaymentDtoStatus[keyof typeof StudentPaymentDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StudentPaymentDtoStatus = {
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  LATE: 'LATE',
} as const;
