/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PayoutBankDto } from './payoutBankDto';

/**
 * Where payouts go. Null until a bank account is added.
 * @nullable
 */
export type ConnectStatusDtoPayoutBank = PayoutBankDto | null;
