/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { LandlordPaymentRowDtoKind } from './landlordPaymentRowDtoKind';
import type { LandlordPaymentRowDtoTenant } from './landlordPaymentRowDtoTenant';
import type { LandlordPaymentRowDtoStatus } from './landlordPaymentRowDtoStatus';
import type { LandlordPaymentRowDtoPlan } from './landlordPaymentRowDtoPlan';
import type { LandlordPaymentRowDtoPayoutStatus } from './landlordPaymentRowDtoPayoutStatus';

export interface LandlordPaymentRowDto {
  payment: string;
  kind: LandlordPaymentRowDtoKind;
  /**
   * Null for a holding deposit.
   * @nullable
   */
  tenancy: string | null;
  /** @nullable */
  property: string | null;
  tenant: LandlordPaymentRowDtoTenant;
  amount: number;
  status: LandlordPaymentRowDtoStatus;
  dueDate: string;
  /** @nullable */
  paidAt: string | null;
  /**
   * How often this tenant pays. Null for a holding deposit.
   * @nullable
   */
  plan: LandlordPaymentRowDtoPlan;
  /** Paid automatically with a saved card. */
  autopay: boolean;
  /**
   * @minimum 0
   * @maximum 14
   */
  remindDaysBefore: number;
  /** Reminders Seek has sent this tenant for this payment. */
  remindersSent: number;
  /** A paid holding deposit the landlord must refund within 7 days (Tenant Fees Act). */
  refundDue: boolean;
  /** Seek's 0.5% fee on this payment, pence. */
  fee: number;
  /** What the landlord receives for this payment, pence. */
  payout: number;
  /**
   * Estimated payout date for this payment: two working days after it is paid or due. Null once it is late or failed, or while it is held.
   * @nullable
   */
  nextPayout: string | null;
  /**
   * HELD: Seek holds this payment until payouts are set up. TRANSFERRED: released since.
   * @nullable
   */
  payoutStatus: LandlordPaymentRowDtoPayoutStatus;
}
