/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { LandlordPaymentRowDto } from './landlordPaymentRowDto';

export interface LandlordPaymentsDto {
  month: string;
  /** Rent paid this month, pence. Holding deposits are in holdingDepositsCollected. Same figure as /landlord/overview rentCollectedThisMonth. */
  collected: number;
  /** Rent due this month, pence (holding deposits excluded). */
  expected: number;
  /** Number of late rent payments this month. */
  late: number;
  /** Late rent amount this month, pence. */
  lateAmount: number;
  /** Holding deposits paid this month, pence. Not rent: the landlord keeps them in full. */
  holdingDepositsCollected: number;
  /** Holding deposits due this month, pence. */
  holdingDepositsExpected: number;
  /** Seek fees on payments collected this month, pence. */
  seekFee: number;
  /** Paid out to the landlord this month, pence. */
  payouts: number;
  /**
   * Estimated date of the next payout: two working days after the earliest paid or due rent. Null when nothing is on its way, or while payouts are on hold.
   * @nullable
   */
  nextPayoutDate: string | null;
  /** True when tenants can't pay this landlord by card yet (no Stripe account able to take card payments): card payment is blocked until setup is finished. */
  payoutsOnHold: boolean;
  /** Legacy: paid this month but held by Seek from before direct card payments, pence (after Seek's fee). */
  held: number;
  rows: LandlordPaymentRowDto[];
}
