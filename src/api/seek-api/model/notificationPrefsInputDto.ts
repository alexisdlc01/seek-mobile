/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface NotificationPrefsInputDto {
  /**
   * @minimum 0
   * @maximum 14
   */
  rentReminderDaysBefore?: number;
  receiptEveryPayment?: boolean;
  landlordEveryPayment?: boolean;
  newQualifiedHousehold?: boolean;
  complianceDue?: boolean;
  weeklySummary?: boolean;
}
