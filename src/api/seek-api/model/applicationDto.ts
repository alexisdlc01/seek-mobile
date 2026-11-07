/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { Listing } from './listing';
import type { ConversationDto } from './conversationDto';
import type { UserDto } from './userDto';
import type { ApplicationDtoStage } from './applicationDtoStage';
import type { ApplicationCriterionDto } from './applicationCriterionDto';
import type { ApplicationMemberDto } from './applicationMemberDto';

export interface ApplicationDto {
  _id: string;
  listing: Listing;
  conversation: ConversationDto;
  landlord: string;
  applicants: string[];
  applicantUsers?: UserDto[];
  createdAt: string;
  owner: string;
  stage: ApplicationDtoStage;
  /** @nullable */
  sentAt?: string | null;
  /** @nullable */
  viewingAt?: string | null;
  /** @nullable */
  offeredAt?: string | null;
  /**
   * Deadline for the household to accept the offer (15 days after it was made).
   * @nullable
   */
  offerExpiresAt?: string | null;
  /**
   * Holding deposit per room in whole pounds, recorded with the offer.
   * @nullable
   */
  holdingDeposit?: number | null;
  /** @nullable */
  rejectReason?: string | null;
  /** Landlord view: pass or fail for each criterion on the listing. */
  criteria?: ApplicationCriterionDto[];
  /** Share of members whose passport is ready, 0-100. */
  readiness?: number;
  /** Every member ready and the group meets the listing criteria. */
  qualified?: boolean;
  /**
   * Student view: place among qualified households, 1 = first in line. Null while not qualified.
   * @nullable
   */
  queuePosition?: number | null;
  /** Student view: qualified households in this listing's queue. */
  queueSize?: number;
  members?: ApplicationMemberDto[];
}
