/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Accepted but ignored: client-created bills are always MANUAL.
 */
export type CreateBillDtoSource = typeof CreateBillDtoSource[keyof typeof CreateBillDtoSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateBillDtoSource = {
  EMAIL: 'EMAIL',
  MANUAL: 'MANUAL',
} as const;
