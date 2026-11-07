/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface RespondDeductionsDto {
  /** true to agree to the proposed deductions, false to dispute them. */
  accept: boolean;
  note?: string;
}
