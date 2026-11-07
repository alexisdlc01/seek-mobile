/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type RentPlanViewDtoMode = typeof RentPlanViewDtoMode[keyof typeof RentPlanViewDtoMode];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentPlanViewDtoMode = {
  stripe: 'stripe',
  simulated: 'simulated',
  unavailable: 'unavailable',
} as const;
