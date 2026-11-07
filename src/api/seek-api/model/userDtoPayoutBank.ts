/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Where payouts go (landlords): { last4, bankName, verified }. Null until Stripe has a bank account.
 * @nullable
 */
export type UserDtoPayoutBank = { [key: string]: unknown } | null;
