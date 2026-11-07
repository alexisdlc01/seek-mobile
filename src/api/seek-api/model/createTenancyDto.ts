/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CreateTenancyDtoDepositScheme } from './createTenancyDtoDepositScheme';

export interface CreateTenancyDto {
  /** Listing id (must be yours). */
  listing: string;
  /** Student user ids to invite, for a tenancy made by hand. Each must accept before rent is scheduled. Ignored when application is given. */
  tenants?: string[];
  /** ACCEPTED application on your listing this tenancy comes from. Its applicants become the tenants. */
  application?: string;
  startDate: string;
  endDate?: string;
  periodic?: boolean;
  /** Rent per tenant per month, in pence. */
  monthlyRent: number;
  /** Deposit per tenant, in pence. */
  depositAmount?: number;
  /** Energy fair-use allowance for the household, in pence per month. */
  energyAllowance?: number;
  depositScheme?: CreateTenancyDtoDepositScheme;
  depositReference?: string;
  depositProtectedAt?: string;
  /** When the deposit was received. */
  depositReceivedAt?: string;
}
