/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ApplicationCriterionDtoKey = typeof ApplicationCriterionDtoKey[keyof typeof ApplicationCriterionDtoKey];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ApplicationCriterionDtoKey = {
  PASSPORTS: 'PASSPORTS',
  HOUSEHOLD_SIZE: 'HOUSEHOLD_SIZE',
  MAX_HOUSEHOLD: 'MAX_HOUSEHOLD',
  GUARANTOR: 'GUARANTOR',
  REFERENCES: 'REFERENCES',
} as const;
