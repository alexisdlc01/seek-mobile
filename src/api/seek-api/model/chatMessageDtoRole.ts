/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ChatMessageDtoRole = typeof ChatMessageDtoRole[keyof typeof ChatMessageDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ChatMessageDtoRole = {
  user: 'user',
  assistant: 'assistant',
} as const;
