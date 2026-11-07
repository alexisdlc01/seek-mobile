/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ContractStatus = typeof ContractStatus[keyof typeof ContractStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContractStatus = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  SIGNED: 'SIGNED',
} as const;
