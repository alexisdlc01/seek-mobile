/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TenancyStatus = typeof TenancyStatus[keyof typeof TenancyStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TenancyStatus = {
  PENDING_ACCEPTANCE: 'PENDING_ACCEPTANCE',
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED',
} as const;
