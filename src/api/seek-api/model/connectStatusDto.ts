/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ConnectStatusDtoMode } from './connectStatusDtoMode';
import type { ConnectStatusDtoPayoutBank } from './connectStatusDtoPayoutBank';

export interface ConnectStatusDto {
  mode: ConnectStatusDtoMode;
  /** A payout account has been created for this landlord. */
  connected: boolean;
  /** @nullable */
  accountId: string | null;
  /** Tenants can pay by card. */
  chargesEnabled: boolean;
  /** Stripe can pay out to the landlord's bank. */
  payoutsEnabled: boolean;
  /** The landlord finished Stripe's onboarding form. */
  detailsSubmitted: boolean;
  /**
   * Where payouts go. Null until a bank account is added.
   * @nullable
   */
  payoutBank: ConnectStatusDtoPayoutBank;
}
