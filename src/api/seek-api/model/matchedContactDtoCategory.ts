/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type MatchedContactDtoCategory = typeof MatchedContactDtoCategory[keyof typeof MatchedContactDtoCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MatchedContactDtoCategory = {
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT',
  APPLICANT: 'APPLICANT',
  BILLS: 'BILLS',
  DEPOSIT: 'DEPOSIT',
  HOUSEHOLD: 'HOUSEHOLD',
  UNIVERSITY: 'UNIVERSITY',
  OTHER: 'OTHER',
} as const;
