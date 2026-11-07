/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InboxMessageDtoVia } from './inboxMessageDtoVia';
import type { InboxAttachmentDto } from './inboxAttachmentDto';

export interface InboxMessageDto {
  id: string;
  from: string;
  me: boolean;
  via: InboxMessageDtoVia;
  time: string;
  timeLabel: string;
  /** Email subject. */
  subject?: string;
  text: string;
  /** First attachment. */
  attachment?: InboxAttachmentDto;
  attachments: InboxAttachmentDto[];
}
