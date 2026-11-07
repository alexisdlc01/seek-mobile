/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RentPlanFrequency } from './rentPlanFrequency';

export interface RentPlan {
  _id: string;
  tenancy: string;
  tenant: string;
  frequency: RentPlanFrequency;
  autopay: boolean;
  notifyEveryPayment: boolean;
  /**
   * @minimum 0
   * @maximum 14
   */
  remindDaysBefore: number;
}
