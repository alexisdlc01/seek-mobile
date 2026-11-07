/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingPaymentPlansItem = typeof ListingPaymentPlansItem[keyof typeof ListingPaymentPlansItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingPaymentPlansItem = {
  MONTHLY: 'MONTHLY',
  SIX_MONTHS: 'SIX_MONTHS',
  YEARLY: 'YEARLY',
} as const;
