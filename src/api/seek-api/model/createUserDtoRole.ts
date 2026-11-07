/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CreateUserDtoRole = typeof CreateUserDtoRole[keyof typeof CreateUserDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateUserDtoRole = {
  SUPERUSER: 'SUPERUSER',
  STUDENT: 'STUDENT',
  LANDLORD_AGENCY: 'LANDLORD_AGENCY',
} as const;
