/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type UpdateRentPlanDtoFrequency = typeof UpdateRentPlanDtoFrequency[keyof typeof UpdateRentPlanDtoFrequency];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateRentPlanDtoFrequency = {
  MONTHLY: 'MONTHLY',
  SIX_MONTHS: 'SIX_MONTHS',
  YEARLY: 'YEARLY',
} as const;
