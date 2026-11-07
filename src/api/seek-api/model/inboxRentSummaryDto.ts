/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface InboxRentSummaryDto {
  /** Tenants who have paid this month's rent. */
  paid: number;
  /** Tenants on the tenancy. */
  total: number;
}
