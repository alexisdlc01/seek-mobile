/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type LandlordPaymentRowDtoKind = typeof LandlordPaymentRowDtoKind[keyof typeof LandlordPaymentRowDtoKind];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LandlordPaymentRowDtoKind = {
  RENT: 'RENT',
  HOLDING_DEPOSIT: 'HOLDING_DEPOSIT',
} as const;
