/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InviteTeamMemberDtoScopesItem = typeof InviteTeamMemberDtoScopesItem[keyof typeof InviteTeamMemberDtoScopesItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InviteTeamMemberDtoScopesItem = {
  VIEWINGS_INBOX: 'VIEWINGS_INBOX',
  APPLICATIONS: 'APPLICATIONS',
  LISTINGS: 'LISTINGS',
  REPAIRS: 'REPAIRS',
  TENANCIES: 'TENANCIES',
} as const;
