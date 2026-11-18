/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ResolveFlagDtoStatus = typeof ResolveFlagDtoStatus[keyof typeof ResolveFlagDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ResolveFlagDtoStatus = {
  ACCOUNT_SUSPENDED: 'ACCOUNT_SUSPENDED',
  NO_ACTION: 'NO_ACTION',
} as const;
