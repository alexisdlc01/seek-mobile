/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface BillShareDto {
  user: string;
  /** This tenant's share, in pence. */
  amount: number;
  /** This tenant has paid their share. */
  paid: boolean;
}
