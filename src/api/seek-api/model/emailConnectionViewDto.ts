/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { EmailConnectionViewDtoProvider } from './emailConnectionViewDtoProvider';
import type { EmailConnectionViewDtoStatus } from './emailConnectionViewDtoStatus';
import type { MatchedContactDto } from './matchedContactDto';

export interface EmailConnectionViewDto {
  id: string;
  provider: EmailConnectionViewDtoProvider;
  label: string;
  emailAddress: string;
  status: EmailConnectionViewDtoStatus;
  /** Replies can be sent from this mailbox. False for IMAP (read-only). */
  canSend: boolean;
  /** Only housing emails are synced (your connector settings scope is housing). */
  housingOnly: boolean;
  /** @nullable */
  lastSyncAt: string | null;
  /** @nullable */
  lastError: string | null;
  /** Housing emails stored from this mailbox. */
  emailCount: number;
  /** Distinct senders and recipients matched. */
  contactCount: number;
  matchedContacts: MatchedContactDto[];
}
