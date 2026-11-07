/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InboxReplyDtoVia } from './inboxReplyDtoVia';

export interface InboxReplyDto {
  /** @maxLength 5000 */
  text: string;
  /** Seek threads go through Seek unless this is email. Email threads always reply by email. */
  via?: InboxReplyDtoVia;
}
