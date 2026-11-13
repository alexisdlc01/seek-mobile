/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Format check only: DECLARED or INVALID_FORMAT.
 */
export type RegistrationDtoStatus = typeof RegistrationDtoStatus[keyof typeof RegistrationDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RegistrationDtoStatus = {
  DECLARED: 'DECLARED',
  INVALID_FORMAT: 'INVALID_FORMAT',
} as const;
