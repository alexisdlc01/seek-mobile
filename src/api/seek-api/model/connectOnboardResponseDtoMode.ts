/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ConnectOnboardResponseDtoMode = typeof ConnectOnboardResponseDtoMode[keyof typeof ConnectOnboardResponseDtoMode];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConnectOnboardResponseDtoMode = {
  stripe: 'stripe',
  simulated: 'simulated',
} as const;
