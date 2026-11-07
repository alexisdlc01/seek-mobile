/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * HELD: paid by card while the landlord's payouts weren't set up, so Seek holds the money. TRANSFERRED: Seek has since sent it to the landlord. Null: it goes straight to the landlord.
 * @nullable
 */
export type StudentPaymentDtoPayoutStatus = typeof StudentPaymentDtoPayoutStatus[keyof typeof StudentPaymentDtoPayoutStatus] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StudentPaymentDtoPayoutStatus = {
  HELD: 'HELD',
  TRANSFERRED: 'TRANSFERRED',
} as const;
