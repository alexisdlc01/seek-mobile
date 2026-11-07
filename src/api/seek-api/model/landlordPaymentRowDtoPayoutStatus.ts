/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * HELD: Seek holds this payment until payouts are set up. TRANSFERRED: released since.
 * @nullable
 */
export type LandlordPaymentRowDtoPayoutStatus = typeof LandlordPaymentRowDtoPayoutStatus[keyof typeof LandlordPaymentRowDtoPayoutStatus] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LandlordPaymentRowDtoPayoutStatus = {
  HELD: 'HELD',
  TRANSFERRED: 'TRANSFERRED',
} as const;
