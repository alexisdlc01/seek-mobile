/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UpdateDepositDtoDepositScheme } from './updateDepositDtoDepositScheme';

export interface UpdateDepositDto {
  depositScheme: UpdateDepositDtoDepositScheme;
  depositReference: string;
  /** Defaults to now. */
  depositProtectedAt?: string;
  /** When the deposit was received. */
  depositReceivedAt?: string;
  /** Correct the deposit per tenant, in pence. */
  depositAmount?: number;
}
