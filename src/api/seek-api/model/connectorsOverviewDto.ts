/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ProviderAvailabilityDto } from './providerAvailabilityDto';
import type { ConnectorSettingsDto } from './connectorSettingsDto';
import type { EmailConnectionViewDto } from './emailConnectionViewDto';

export interface ConnectorsOverviewDto {
  providers: ProviderAvailabilityDto[];
  settings: ConnectorSettingsDto;
  connections: EmailConnectionViewDto[];
}
