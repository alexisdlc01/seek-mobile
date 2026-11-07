/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CreateListingDtoPaymentPlansItem = typeof CreateListingDtoPaymentPlansItem[keyof typeof CreateListingDtoPaymentPlansItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateListingDtoPaymentPlansItem = {
  MONTHLY: 'MONTHLY',
  SIX_MONTHS: 'SIX_MONTHS',
  YEARLY: 'YEARLY',
} as const;
