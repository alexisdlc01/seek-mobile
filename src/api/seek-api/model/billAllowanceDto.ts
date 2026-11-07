/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { BillAllowanceDtoUtility } from './billAllowanceDtoUtility';
import type { BillShareAmountDto } from './billShareAmountDto';

export interface BillAllowanceDto {
  utility: BillAllowanceDtoUtility;
  /** Household allowance for this bill's period, in pence. */
  allowance: number;
  /** What this bill used, in pence. */
  used: number;
  /** Share of the allowance used, as a whole percentage (can exceed 100). */
  percentUsed: number;
  /** Usage over the allowance, in pence (0 when within it). */
  overage: number;
  /** The overage split between the tenants, in pence. */
  overagePerMember: BillShareAmountDto[];
}
