/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxThreadDtoCategory = typeof InboxThreadDtoCategory[keyof typeof InboxThreadDtoCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxThreadDtoCategory = {
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT',
  APPLICANT: 'APPLICANT',
  BILLS: 'BILLS',
  DEPOSIT: 'DEPOSIT',
  HOUSEHOLD: 'HOUSEHOLD',
  UNIVERSITY: 'UNIVERSITY',
  OTHER: 'OTHER',
} as const;
