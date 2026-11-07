/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { EmailConnectionViewDto } from './emailConnectionViewDto';

export interface SyncResultDto {
  /** Emails looked at. */
  scanned: number;
  /** Housing emails stored. */
  imported: number;
  /** Emails dropped because they are not about housing. */
  skipped: number;
  /** Attachments filed into tenancy documents or bills. */
  filed: number;
  connection: EmailConnectionViewDto;
}
