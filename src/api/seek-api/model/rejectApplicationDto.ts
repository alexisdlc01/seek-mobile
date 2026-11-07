/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface RejectApplicationDto {
  /**
   * Why the application was declined. Shown to the household.
   * @maxLength 500
   */
  reason?: string;
}
