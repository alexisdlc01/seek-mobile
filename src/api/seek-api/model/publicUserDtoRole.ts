/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PublicUserDtoRole = typeof PublicUserDtoRole[keyof typeof PublicUserDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PublicUserDtoRole = {
  SUPERUSER: 'SUPERUSER',
  STUDENT: 'STUDENT',
  LANDLORD_AGENCY: 'LANDLORD_AGENCY',
} as const;
