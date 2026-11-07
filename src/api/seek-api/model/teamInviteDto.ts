/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { TeamInviteDtoScopesItem } from './teamInviteDtoScopesItem';

export interface TeamInviteDto {
  /** The landlord who invited you; use it to accept. */
  ownerId: string;
  ownerName: string;
  scopes: TeamInviteDtoScopesItem[];
  invitedAt: string;
}
