/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ChatMessageDtoRole } from './chatMessageDtoRole';

export interface ChatMessageDto {
  role: ChatMessageDtoRole;
  /** @maxLength 2000 */
  content: string;
}
