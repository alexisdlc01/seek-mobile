/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type AuthUrlDtoProvider = typeof AuthUrlDtoProvider[keyof typeof AuthUrlDtoProvider];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AuthUrlDtoProvider = {
  GMAIL: 'GMAIL',
  OUTLOOK: 'OUTLOOK',
} as const;
