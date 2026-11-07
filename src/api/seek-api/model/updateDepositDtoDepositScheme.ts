/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type UpdateDepositDtoDepositScheme = typeof UpdateDepositDtoDepositScheme[keyof typeof UpdateDepositDtoDepositScheme];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateDepositDtoDepositScheme = {
  DPS: 'DPS',
  TDS: 'TDS',
  MYDEPOSITS: 'MYDEPOSITS',
} as const;
