/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { DisconnectResultDtoStatus } from './disconnectResultDtoStatus';

export interface DisconnectResultDto {
  id: string;
  status: DisconnectResultDtoStatus;
  /** Stored emails deleted with the connection. */
  removedEmails: number;
}
