/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Legacy only (no new card payment is ever held). HELD: an old payment Seek collected before the landlord could take card payments. TRANSFERRED: released since.
 * @nullable
 */
export type LandlordPaymentRowDtoPayoutStatus = typeof LandlordPaymentRowDtoPayoutStatus[keyof typeof LandlordPaymentRowDtoPayoutStatus] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LandlordPaymentRowDtoPayoutStatus = {
  HELD: 'HELD',
  TRANSFERRED: 'TRANSFERRED',
} as const;
