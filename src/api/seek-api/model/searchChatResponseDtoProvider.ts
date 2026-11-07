/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Which provider answered: Gemini first, then Anthropic, then the built-in parser.
 */
export type SearchChatResponseDtoProvider = typeof SearchChatResponseDtoProvider[keyof typeof SearchChatResponseDtoProvider];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SearchChatResponseDtoProvider = {
  gemini: 'gemini',
  anthropic: 'anthropic',
  rules: 'rules',
} as const;
