/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CheckoutResponseDtoMode } from './checkoutResponseDtoMode';
import type { CheckoutResponseDtoStatus } from './checkoutResponseDtoStatus';

export interface CheckoutResponseDto {
  mode: CheckoutResponseDtoMode;
  /**
   * Checkout Session id. Null in simulated mode.
   * @nullable
   */
  sessionId: string | null;
  /**
   * Open this page. Stripe's hosted Checkout, or the success URL straight away in simulated mode (already paid). Null when the payment was already paid: nothing to open.
   * @nullable
   */
  url: string | null;
  status: CheckoutResponseDtoStatus;
}
