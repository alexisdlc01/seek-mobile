/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface UpdateReminderScheduleDto {
  beforeDue?: boolean;
  onDueDay?: boolean;
  lateAfterThreeDays?: boolean;
}
