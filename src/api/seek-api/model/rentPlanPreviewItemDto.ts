/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RentPlanPreviewItemDtoStatus } from './rentPlanPreviewItemDtoStatus';

export interface RentPlanPreviewItemDto {
  dueDate: string;
  /** In pence, after any holding deposit credit. */
  amount: number;
  /** Months of rent this payment covers. */
  coversMonths: number;
  /** Holding deposit taken off this payment, in pence. */
  holdingDepositCredit: number;
  status: RentPlanPreviewItemDtoStatus;
}
