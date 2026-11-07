/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * @nullable
 */
export type StudentPaymentDtoProvider = typeof StudentPaymentDtoProvider[keyof typeof StudentPaymentDtoProvider] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StudentPaymentDtoProvider = {
  stripe: 'stripe',
  simulated: 'simulated',
} as const;
