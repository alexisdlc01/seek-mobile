/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface NotificationPrefsDto {
  rentReminderDaysBefore: number;
  receiptEveryPayment: boolean;
  landlordEveryPayment: boolean;
  newQualifiedHousehold: boolean;
  complianceDue: boolean;
  weeklySummary: boolean;
}
