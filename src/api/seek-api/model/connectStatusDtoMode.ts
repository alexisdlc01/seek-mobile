/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ConnectStatusDtoMode = typeof ConnectStatusDtoMode[keyof typeof ConnectStatusDtoMode];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConnectStatusDtoMode = {
  stripe: 'stripe',
  simulated: 'simulated',
  unavailable: 'unavailable',
} as const;
