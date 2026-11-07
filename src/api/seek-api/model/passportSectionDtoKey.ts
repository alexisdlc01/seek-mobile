/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PassportSectionDtoKey = typeof PassportSectionDtoKey[keyof typeof PassportSectionDtoKey];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PassportSectionDtoKey = {
  identity: 'identity',
  studies: 'studies',
  money: 'money',
  references: 'references',
} as const;
