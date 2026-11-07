/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ChatMessageDto } from './chatMessageDto';

export interface SearchChatDto {
  /** The conversation so far, oldest first. */
  messages: ChatMessageDto[];
}
