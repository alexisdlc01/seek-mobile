/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PassportDto } from './passportDto';
import type { ApplicationMemberDtoUniversityDetails } from './applicationMemberDtoUniversityDetails';

export interface ApplicationMemberDto {
  user: string;
  name?: string;
  /** File links are only included while the member's share is active. */
  passport: PassportDto;
  /** @nullable */
  shareExpiresAt: string | null;
  /**
   * Course, university and year from the student's profile.
   * @nullable
   */
  universityDetails: ApplicationMemberDtoUniversityDetails;
}
