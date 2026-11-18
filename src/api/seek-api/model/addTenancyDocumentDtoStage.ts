/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Inventory stage; defaults to check-in.
 */
export type AddTenancyDocumentDtoStage = typeof AddTenancyDocumentDtoStage[keyof typeof AddTenancyDocumentDtoStage];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AddTenancyDocumentDtoStage = {
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT',
} as const;
