/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InviteTeamMemberDtoScopesItem } from './inviteTeamMemberDtoScopesItem';

export interface InviteTeamMemberDto {
  email: string;
  /** There is no payouts scope. */
  scopes: InviteTeamMemberDtoScopesItem[];
}
