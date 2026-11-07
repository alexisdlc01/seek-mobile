/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ReminderScheduleDto {
  /** Remind before the due date (each tenant's own lead time, 3 days by default). */
  beforeDue: boolean;
  /** Remind on the day rent is due. */
  onDueDay: boolean;
  /** Remind once, three days after the due date, if it is still unpaid. */
  lateAfterThreeDays: boolean;
}
