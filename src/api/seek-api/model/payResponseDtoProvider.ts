/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PayResponseDtoProvider = typeof PayResponseDtoProvider[keyof typeof PayResponseDtoProvider];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PayResponseDtoProvider = {
  stripe: 'stripe',
  simulated: 'simulated',
} as const;
