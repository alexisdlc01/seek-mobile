/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Whether the model or the built-in parser read the request.
 */
export type SearchChatResponseDtoSource = typeof SearchChatResponseDtoSource[keyof typeof SearchChatResponseDtoSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SearchChatResponseDtoSource = {
  ai: 'ai',
  rules: 'rules',
} as const;
