/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TenancyDocumentStage = typeof TenancyDocumentStage[keyof typeof TenancyDocumentStage];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TenancyDocumentStage = {
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT',
} as const;
