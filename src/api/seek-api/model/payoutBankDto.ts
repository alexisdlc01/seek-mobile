/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface PayoutBankDto {
  /** @nullable */
  last4: string | null;
  /** @nullable */
  bankName: string | null;
  /** Stripe has verified the account. */
  verified: boolean;
}
