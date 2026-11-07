/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type BillViewDtoCategory = typeof BillViewDtoCategory[keyof typeof BillViewDtoCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BillViewDtoCategory = {
  ENERGY: 'ENERGY',
  WATER: 'WATER',
  BROADBAND: 'BROADBAND',
  COUNCIL_TAX: 'COUNCIL_TAX',
  TV_LICENCE: 'TV_LICENCE',
  OTHER: 'OTHER',
} as const;
