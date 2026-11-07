/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { TeamMemberDtoScopesItem } from './teamMemberDtoScopesItem';

export interface TeamMemberDto {
  id: string;
  email: string;
  /**
   * The member's name, once they have a Seek account.
   * @nullable
   */
  name: string | null;
  scopes: TeamMemberDtoScopesItem[];
  /** The invitee accepted the invite with this email. False while the invite is pending. */
  hasAccount: boolean;
  invitedAt: string;
  /** Team members never see payouts. */
  canSeePayouts: boolean;
}
