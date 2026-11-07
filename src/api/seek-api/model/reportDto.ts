/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ReportDto {
  /**
   * What happened.
   * @maxLength 5000
   */
  message: string;
  /**
   * The account being reported, as the reporter described it.
   * @maxLength 120
   */
  reportedAccount?: string;
}
