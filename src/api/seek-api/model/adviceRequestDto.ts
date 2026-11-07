/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { AdviceRequestDtoTopic } from './adviceRequestDtoTopic';

export interface AdviceRequestDto {
  topic: AdviceRequestDtoTopic;
  /** Defaults to your current tenancy. */
  tenancyId?: string;
  /** With topic application: assess this household (criteria and each member's Seek Passport) instead of the overview. Landlord of the listing or a household member only. */
  applicationId?: string;
  /**
   * A question in your own words, answered from the same facts as the card.
   * @maxLength 500
   */
  question?: string;
  /** Inbox thread, for topic inbox. */
  threadId?: string;
}
