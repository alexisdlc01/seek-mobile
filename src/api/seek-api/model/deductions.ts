/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { DeductionItem } from './deductionItem';
import type { DeductionsStatus } from './deductionsStatus';
import type { DeductionResponse } from './deductionResponse';

export interface Deductions {
  items: DeductionItem[];
  /** Sum of the items, in pence. Never more than the household's deposit. */
  total: number;
  /** ACCEPTED once every tenant agrees; DISPUTED as soon as one disagrees. */
  status: DeductionsStatus;
  responses: DeductionResponse[];
  proposedAt: string;
}
