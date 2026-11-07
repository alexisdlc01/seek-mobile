/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ChangeEmailDto {
  /** The current password, required to confirm the account holder is making this change. */
  currentPassword: string;
  /** The address to move the account to. */
  newEmail: string;
}
