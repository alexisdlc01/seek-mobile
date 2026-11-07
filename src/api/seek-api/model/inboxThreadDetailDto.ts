/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InboxThreadDetailDtoKind } from './inboxThreadDetailDtoKind';
import type { InboxThreadDetailDtoCategory } from './inboxThreadDetailDtoCategory';
import type { InboxThreadDetailDtoRent } from './inboxThreadDetailDtoRent';
import type { InboxMessageDto } from './inboxMessageDto';

export interface InboxThreadDetailDto {
  id: string;
  kind: InboxThreadDetailDtoKind;
  name: string;
  sub: string;
  category: InboxThreadDetailDtoCategory;
  /** @nullable */
  tenancyId: string | null;
  /** A reply can go through Seek (Seek threads only). */
  canReplyBySeek: boolean;
  /** A reply can go out by email from your own address. */
  canReplyByEmail: boolean;
  /**
   * Your address email replies are sent from.
   * @nullable
   */
  replyFrom: string | null;
  /**
   * A reply to the last message, ready to edit and send. Null when you wrote last or AI replies are off.
   * @nullable
   */
  suggestedReply: string | null;
  /**
   * This month's rent for the thread's tenancy.
   * @nullable
   */
  rent: InboxThreadDetailDtoRent;
  messages: InboxMessageDto[];
}
