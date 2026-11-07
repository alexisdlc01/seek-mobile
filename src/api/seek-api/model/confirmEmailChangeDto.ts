/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ConfirmEmailChangeDto {
  userId: string;
  /** Token from the confirmation email. */
  token: string;
}
