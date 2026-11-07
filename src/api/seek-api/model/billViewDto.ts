/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { BillViewDtoCategory } from './billViewDtoCategory';
import type { BillViewDtoStatus } from './billViewDtoStatus';
import type { BillViewDtoSource } from './billViewDtoSource';
import type { BillShareDto } from './billShareDto';
import type { BillViewDtoAllowance } from './billViewDtoAllowance';

export interface BillViewDto {
  _id: string;
  tenancy: string;
  provider: string;
  category: BillViewDtoCategory;
  /** Whole bill, in pence. */
  amount: number;
  /** @nullable */
  periodStart: string | null;
  /** @nullable */
  periodEnd: string | null;
  /** @nullable */
  dueDate: string | null;
  /** Covered by the rent: nobody owes a share. */
  includedInRent: boolean;
  /** Tenants who share this bill. */
  splitBetween: string[];
  /** Tenants who have paid their share. The bill is PAID once everyone has. */
  paidShares: string[];
  /**
   * Tenant who fronted the whole bill (a shared extra); the others owe them their share.
   * @nullable
   */
  paidBy: string | null;
  status: BillViewDtoStatus;
  source: BillViewDtoSource;
  /** @nullable */
  paidAt: string | null;
  /**
   * Name of the tenant in paidBy.
   * @nullable
   */
  paidByName: string | null;
  shares: BillShareDto[];
  /** The signed-in tenant's share, in pence (0 if they don't share it). */
  myShare: number;
  /** The signed-in tenant's share is paid (or the bill is settled). */
  myPaid: boolean;
  /**
   * Energy fair-use allowance for this bill, when the tenancy has one.
   * @nullable
   */
  allowance: BillViewDtoAllowance;
}
