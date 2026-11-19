/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Legacy only, never written for new charges. HELD: an old card payment Seek collected before the landlord could take card payments. TRANSFERRED: Seek has since sent it to the landlord. Null: it went straight to the landlord.
 * @nullable
 */
export type StudentPaymentDtoPayoutStatus = typeof StudentPaymentDtoPayoutStatus[keyof typeof StudentPaymentDtoPayoutStatus] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StudentPaymentDtoPayoutStatus = {
  HELD: 'HELD',
  TRANSFERRED: 'TRANSFERRED',
} as const;
