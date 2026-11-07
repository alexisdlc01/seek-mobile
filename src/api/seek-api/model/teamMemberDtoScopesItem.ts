/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TeamMemberDtoScopesItem = typeof TeamMemberDtoScopesItem[keyof typeof TeamMemberDtoScopesItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TeamMemberDtoScopesItem = {
  VIEWINGS_INBOX: 'VIEWINGS_INBOX',
  APPLICATIONS: 'APPLICATIONS',
  LISTINGS: 'LISTINGS',
  REPAIRS: 'REPAIRS',
  TENANCIES: 'TENANCIES',
} as const;
