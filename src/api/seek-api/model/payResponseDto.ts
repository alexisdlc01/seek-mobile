/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PayResponseDtoStatus } from './payResponseDtoStatus';
import type { PayResponseDtoProvider } from './payResponseDtoProvider';

export interface PayResponseDto {
  paymentId: string;
  status: PayResponseDtoStatus;
  provider: PayResponseDtoProvider;
  /**
   * Stripe PaymentIntent client secret for the Payment Element. Null when already paid or simulated.
   * @nullable
   */
  clientSecret: string | null;
}
