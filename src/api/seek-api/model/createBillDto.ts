/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CreateBillDtoCategory } from './createBillDtoCategory';
import type { CreateBillDtoSource } from './createBillDtoSource';

export interface CreateBillDto {
  tenancy: string;
  provider: string;
  category: CreateBillDtoCategory;
  /** Whole bill, in pence. */
  amount: number;
  periodStart?: string;
  periodEnd?: string;
  dueDate?: string;
  includedInRent?: boolean;
  /** Tenant ids. Defaults to every tenant. */
  splitBetween?: string[];
  source?: CreateBillDtoSource;
}
