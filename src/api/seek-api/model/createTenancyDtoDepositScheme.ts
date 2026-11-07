/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CreateTenancyDtoDepositScheme = typeof CreateTenancyDtoDepositScheme[keyof typeof CreateTenancyDtoDepositScheme];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateTenancyDtoDepositScheme = {
  DPS: 'DPS',
  TDS: 'TDS',
  MYDEPOSITS: 'MYDEPOSITS',
} as const;
