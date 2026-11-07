/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxThreadDetailDtoCategory = typeof InboxThreadDetailDtoCategory[keyof typeof InboxThreadDetailDtoCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxThreadDetailDtoCategory = {
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT',
  APPLICANT: 'APPLICANT',
  BILLS: 'BILLS',
  DEPOSIT: 'DEPOSIT',
  HOUSEHOLD: 'HOUSEHOLD',
  UNIVERSITY: 'UNIVERSITY',
  OTHER: 'OTHER',
} as const;
