/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface DeductionItemDto {
  description: string;
  /** In pence. */
  amount: number;
  /** Photo or invoice backing the deduction. */
  evidenceUrl?: string;
}
