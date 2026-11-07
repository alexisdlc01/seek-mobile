/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxControllerThreadsCategory = typeof InboxControllerThreadsCategory[keyof typeof InboxControllerThreadsCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxControllerThreadsCategory = {
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT',
  APPLICANT: 'APPLICANT',
  BILLS: 'BILLS',
  DEPOSIT: 'DEPOSIT',
  HOUSEHOLD: 'HOUSEHOLD',
  UNIVERSITY: 'UNIVERSITY',
  OTHER: 'OTHER',
} as const;
