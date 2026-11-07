/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * How often this tenant pays. Null for a holding deposit.
 * @nullable
 */
export type LandlordPaymentRowDtoPlan = typeof LandlordPaymentRowDtoPlan[keyof typeof LandlordPaymentRowDtoPlan] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LandlordPaymentRowDtoPlan = {
  MONTHLY: 'MONTHLY',
  SIX_MONTHS: 'SIX_MONTHS',
  YEARLY: 'YEARLY',
} as const;
