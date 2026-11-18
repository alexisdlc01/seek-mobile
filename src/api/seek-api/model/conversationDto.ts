/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { MessageDto } from './messageDto';
import type { PublicUserDto } from './publicUserDto';

export interface ConversationDto {
  _id: string;
  name: string;
  lastMessage?: MessageDto;
  unreadCount?: number;
  createdAt: string;
  groupDescription: string;
  avatar: string;
  users: PublicUserDto[];
  messages: MessageDto[];
}
