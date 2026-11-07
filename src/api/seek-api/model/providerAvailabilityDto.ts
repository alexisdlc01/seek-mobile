/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ProviderAvailabilityDtoProvider } from './providerAvailabilityDtoProvider';

export interface ProviderAvailabilityDto {
  provider: ProviderAvailabilityDtoProvider;
  label: string;
  available: boolean;
  /** Why the provider cannot be connected on this server. */
  reason?: string;
}
