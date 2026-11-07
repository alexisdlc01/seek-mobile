/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CreateBillDtoCategory = typeof CreateBillDtoCategory[keyof typeof CreateBillDtoCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateBillDtoCategory = {
  ENERGY: 'ENERGY',
  WATER: 'WATER',
  BROADBAND: 'BROADBAND',
  COUNCIL_TAX: 'COUNCIL_TAX',
  TV_LICENCE: 'TV_LICENCE',
  OTHER: 'OTHER',
} as const;
