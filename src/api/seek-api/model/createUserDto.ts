/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT";
  imageUrl?: string;
  /** @deprecated Server-generated verification values must not be sent. */
  emailVerificationToken?: string;
  /** @deprecated Server-generated verification values must not be sent. */
  otpVerificationCode?: string;
  /** @deprecated Server-generated verification values must not be sent. */
  emailVerificationTokenExpires?: string;
}
