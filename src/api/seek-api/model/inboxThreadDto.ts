/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InboxThreadDtoKind } from './inboxThreadDtoKind';
import type { InboxThreadDtoCategory } from './inboxThreadDtoCategory';
import type { InboxThreadDtoChannelsItem } from './inboxThreadDtoChannelsItem';

export interface InboxThreadDto {
  /** seek-<conversationId> or email-<threadKey>. */
  id: string;
  kind: InboxThreadDtoKind;
  name: string;
  sub: string;
  via: string;
  preview: string;
  time: string;
  /** Short UK-time label for lists. */
  timeLabel: string;
  category: InboxThreadDtoCategory;
  unread: boolean;
  unreadCount: number;
  initials: string;
  channels: InboxThreadDtoChannelsItem[];
  /** @nullable */
  tenancyId: string | null;
}
