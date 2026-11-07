/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type StudentPaymentDtoKind = typeof StudentPaymentDtoKind[keyof typeof StudentPaymentDtoKind];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StudentPaymentDtoKind = {
  RENT: 'RENT',
  HOLDING_DEPOSIT: 'HOLDING_DEPOSIT',
} as const;
