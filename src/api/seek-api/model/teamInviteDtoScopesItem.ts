/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TeamInviteDtoScopesItem = typeof TeamInviteDtoScopesItem[keyof typeof TeamInviteDtoScopesItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TeamInviteDtoScopesItem = {
  VIEWINGS_INBOX: 'VIEWINGS_INBOX',
  APPLICATIONS: 'APPLICATIONS',
  LISTINGS: 'LISTINGS',
  REPAIRS: 'REPAIRS',
  TENANCIES: 'TENANCIES',
} as const;
