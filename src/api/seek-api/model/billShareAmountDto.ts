/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface BillShareAmountDto {
  user: string;
  /** Amount in pence. */
  amount: number;
}
