/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ConnectOnboardResponseDtoMode } from './connectOnboardResponseDtoMode';

export interface ConnectOnboardResponseDto {
  mode: ConnectOnboardResponseDtoMode;
  accountId: string;
  /**
   * Stripe-hosted onboarding page to open. Null in simulated mode, where the account is ready straight away.
   * @nullable
   */
  url: string | null;
}
