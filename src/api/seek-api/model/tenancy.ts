/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { TenancyDepositScheme } from './tenancyDepositScheme';
import type { TenancyDocument } from './tenancyDocument';
import type { TenancyStatus } from './tenancyStatus';

export interface Tenancy {
  _id: string;
  listing: string;
  landlord: string;
  tenants: string[];
  /** Students invited to a hand-made tenancy who have not accepted yet. They move to tenants on accept. */
  pendingTenants: string[];
  /** @nullable */
  application?: string | null;
  startDate: string;
  /** @nullable */
  endDate: string | null;
  /** Rolling (periodic) tenancy, the default under the Renters' Rights Act. */
  periodic: boolean;
  /** Rent per tenant per month, in pence. */
  monthlyRent: number;
  /** Deposit per tenant, in pence. */
  depositAmount: number;
  /**
   * Energy fair-use allowance for the whole household, in pence per month. Usage above it is split between the tenants.
   * @nullable
   */
  energyAllowance: number | null;
  /** @nullable */
  depositScheme: TenancyDepositScheme;
  depositReference?: string;
  /** @nullable */
  depositProtectedAt: string | null;
  /**
   * When the deposit reached the landlord. It must be protected within 30 days of this date.
   * @nullable
   */
  depositReceivedAt: string | null;
  /**
   * When the landlord gave tenants the deposit's prescribed information.
   * @nullable
   */
  prescribedInfoSentAt: string | null;
  documents: TenancyDocument[];
  status: TenancyStatus;
  createdAt: string;
}
