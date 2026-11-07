/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TeamOfDtoScopesItem = typeof TeamOfDtoScopesItem[keyof typeof TeamOfDtoScopesItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TeamOfDtoScopesItem = {
  VIEWINGS_INBOX: 'VIEWINGS_INBOX',
  APPLICATIONS: 'APPLICATIONS',
  LISTINGS: 'LISTINGS',
  REPAIRS: 'REPAIRS',
  TENANCIES: 'TENANCIES',
} as const;
