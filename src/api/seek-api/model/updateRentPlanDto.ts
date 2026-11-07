/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UpdateRentPlanDtoFrequency } from './updateRentPlanDtoFrequency';

export interface UpdateRentPlanDto {
  frequency: UpdateRentPlanDtoFrequency;
  autopay?: boolean;
  notifyEveryPayment?: boolean;
  /**
   * @minimum 0
   * @maximum 14
   */
  remindDaysBefore?: number;
}
