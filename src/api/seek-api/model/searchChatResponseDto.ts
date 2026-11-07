/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { SearchFiltersDto } from './searchFiltersDto';
import type { SearchChatListingDto } from './searchChatListingDto';
import type { SearchChatResponseDtoSource } from './searchChatResponseDtoSource';
import type { SearchChatResponseDtoProvider } from './searchChatResponseDtoProvider';

export interface SearchChatResponseDto {
  reply: string;
  filters: SearchFiltersDto;
  listings: SearchChatListingDto[];
  /** Filters dropped because nothing matched them all. */
  relaxed: string[];
  /** Quick replies for the next message. */
  suggestions: string[];
  /** Whether the model or the built-in parser read the request. */
  source: SearchChatResponseDtoSource;
  /** Which provider answered: Gemini first, then Anthropic, then the built-in parser. */
  provider: SearchChatResponseDtoProvider;
}
