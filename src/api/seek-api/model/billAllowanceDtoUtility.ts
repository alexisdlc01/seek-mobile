/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type BillAllowanceDtoUtility = typeof BillAllowanceDtoUtility[keyof typeof BillAllowanceDtoUtility];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BillAllowanceDtoUtility = {
  ENERGY: 'ENERGY',
  WATER: 'WATER',
  BROADBAND: 'BROADBAND',
  COUNCIL_TAX: 'COUNCIL_TAX',
  TV_LICENCE: 'TV_LICENCE',
  OTHER: 'OTHER',
} as const;
