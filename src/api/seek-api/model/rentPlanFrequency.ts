/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type RentPlanFrequency = typeof RentPlanFrequency[keyof typeof RentPlanFrequency];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentPlanFrequency = {
  MONTHLY: 'MONTHLY',
  SIX_MONTHS: 'SIX_MONTHS',
  YEARLY: 'YEARLY',
} as const;
