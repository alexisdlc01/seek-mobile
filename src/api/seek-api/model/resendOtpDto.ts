/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ResendOtpDto =
  | { userId: string; email?: never }
  /** @deprecated The backend now requires userId. */
  | { email: string; userId?: never };
