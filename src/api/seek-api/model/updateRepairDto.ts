/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UpdateRepairDtoStatus } from './updateRepairDtoStatus';

export interface UpdateRepairDto {
  status: UpdateRepairDtoStatus;
  /** @nullable */
  scheduledFor?: string | null;
}
