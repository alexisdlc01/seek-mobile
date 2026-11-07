/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type AdviceRequestDtoTopic = typeof AdviceRequestDtoTopic[keyof typeof AdviceRequestDtoTopic];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AdviceRequestDtoTopic = {
  deposit: 'deposit',
  bills: 'bills',
  contract: 'contract',
  guarantor: 'guarantor',
  inbox: 'inbox',
  rent: 'rent',
  application: 'application',
} as const;
