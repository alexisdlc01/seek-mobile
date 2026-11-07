/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ContactDto {
  /** @maxLength 100 */
  name: string;
  /** @maxLength 254 */
  email: string;
  /** @maxLength 5000 */
  message: string;
}
