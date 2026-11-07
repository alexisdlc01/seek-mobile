/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingSearchResultDtoPaymentPlansItem = typeof ListingSearchResultDtoPaymentPlansItem[keyof typeof ListingSearchResultDtoPaymentPlansItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingSearchResultDtoPaymentPlansItem = {
  MONTHLY: 'MONTHLY',
  SIX_MONTHS: 'SIX_MONTHS',
  YEARLY: 'YEARLY',
} as const;
