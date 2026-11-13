/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PassportItemDtoStatus = typeof PassportItemDtoStatus[keyof typeof PassportItemDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PassportItemDtoStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  EXPIRED: 'EXPIRED',
  REJECTED: 'REJECTED',
  PROVIDED: 'PROVIDED',
  MISSING: 'MISSING',
} as const;
