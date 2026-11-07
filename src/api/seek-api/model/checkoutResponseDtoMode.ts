/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CheckoutResponseDtoMode = typeof CheckoutResponseDtoMode[keyof typeof CheckoutResponseDtoMode];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CheckoutResponseDtoMode = {
  stripe: 'stripe',
  simulated: 'simulated',
} as const;
