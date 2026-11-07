/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * @nullable
 */
export type TenancyDepositScheme = typeof TenancyDepositScheme[keyof typeof TenancyDepositScheme] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TenancyDepositScheme = {
  DPS: 'DPS',
  TDS: 'TDS',
  MYDEPOSITS: 'MYDEPOSITS',
} as const;
