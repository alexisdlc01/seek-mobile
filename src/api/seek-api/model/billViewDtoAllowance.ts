/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { BillAllowanceDto } from './billAllowanceDto';

/**
 * Energy fair-use allowance for this bill, when the tenancy has one.
 * @nullable
 */
export type BillViewDtoAllowance = BillAllowanceDto | null;
