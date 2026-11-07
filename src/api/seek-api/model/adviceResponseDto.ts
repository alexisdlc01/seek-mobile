/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { AdviceActionDto } from './adviceActionDto';
import type { AdviceResponseDtoSource } from './adviceResponseDtoSource';
import type { AdviceResponseDtoProvider } from './adviceResponseDtoProvider';

export interface AdviceResponseDto {
  title: string;
  advice: string;
  actions?: AdviceActionDto[];
  source: AdviceResponseDtoSource;
  provider: AdviceResponseDtoProvider;
  /**
   * topic inbox with a threadId: a reply to the last message received, ready to edit. Null when AI replies are off.
   * @nullable
   */
  suggestedReply?: string | null;
}
