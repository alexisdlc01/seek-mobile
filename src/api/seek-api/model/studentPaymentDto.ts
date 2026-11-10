/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { StudentPaymentDtoKind } from './studentPaymentDtoKind';
import type { StudentPaymentDtoStatus } from './studentPaymentDtoStatus';
import type { StudentPaymentDtoProvider } from './studentPaymentDtoProvider';
import type { StudentPaymentDtoProviderRef } from './studentPaymentDtoProviderRef';
import type { StudentPaymentDtoPayoutStatus } from './studentPaymentDtoPayoutStatus';
import type { StudentPaymentDtoTransferRef } from './studentPaymentDtoTransferRef';

export interface StudentPaymentDto {
  _id: string;
  kind: StudentPaymentDtoKind;
  /**
   * Null for a holding deposit (no tenancy yet).
   * @nullable
   */
  tenancy: string | null;
  /** The application a holding deposit secures. */
  application?: string;
  tenant: string;
  landlord: string;
  /** What the tenant pays, in pence. */
  amount: number;
  /** Paid holding deposit counted toward this rent (Tenant Fees Act), pence. `amount` is already reduced by it. */
  holdingDepositCredit?: number;
  /** Months of rent this payment covers. */
  coversMonths: number;
  status: StudentPaymentDtoStatus;
  dueDate: string;
  /** @nullable */
  paidAt: string | null;
  /** @nullable */
  provider: StudentPaymentDtoProvider;
  /** @nullable */
  providerRef?: StudentPaymentDtoProviderRef;
  /**
   * HELD: paid by card while the landlord's payouts weren't set up, so Seek holds the money. TRANSFERRED: Seek has since sent it to the landlord. Null: it goes straight to the landlord.
   * @nullable
   */
  payoutStatus?: StudentPaymentDtoPayoutStatus;
  /**
   * Stripe transfer that released a held payment.
   * @nullable
   */
  transferRef?: StudentPaymentDtoTransferRef;
  /** Reminders Seek has sent the tenant for this payment. */
  remindersSent: number;
  /** @nullable */
  lastReminderAt: string | null;
  /** A paid holding deposit the landlord must refund within 7 days (Tenant Fees Act), e.g. after declining the household. */
  refundDue: boolean;
}
