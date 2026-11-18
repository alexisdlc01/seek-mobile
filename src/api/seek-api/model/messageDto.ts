/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PublicUserDto } from './publicUserDto';
import type { MessageDtoMessageType } from './messageDtoMessageType';

export interface MessageDto {
  _id: string;
  sender: PublicUserDto;
  messageType: MessageDtoMessageType;
  data: string;
  createdAt: string;
  conversation: string;
  seenUsers: string[];
  deliveredTo: string[];
}
