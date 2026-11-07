/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { EmailConnectionViewDto } from './emailConnectionViewDto';
import type { ImapConnectResultDtoMode } from './imapConnectResultDtoMode';

export interface ImapConnectResultDto {
  /** Emails looked at. */
  scanned: number;
  /** Housing emails stored. */
  imported: number;
  /** Emails dropped because they are not about housing. */
  skipped: number;
  /** Attachments filed into tenancy documents or bills. */
  filed: number;
  connection: EmailConnectionViewDto;
  /** demo: the IMAP sign-in failed outside production, so the demo mailbox was connected instead. */
  mode: ImapConnectResultDtoMode;
  /** Why the demo mailbox was used. */
  notice?: string;
}
