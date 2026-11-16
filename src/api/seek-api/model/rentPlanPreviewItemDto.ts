/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { StudentPaymentDtoStatus } from './studentPaymentDtoStatus';

/**
 * One payment as it would stand after switching plan. Nothing is saved.
 */
export interface RentPlanPreviewItemDto {
  dueDate: string;
  /** In pence, after any holding deposit credit. */
  amount: number;
  /** Months of rent this payment covers. */
  coversMonths: number;
  /** Holding deposit taken off this payment, in pence. */
  holdingDepositCredit: number;
  status: StudentPaymentDtoStatus;
}
