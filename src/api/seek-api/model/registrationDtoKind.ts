/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type RegistrationDtoKind = typeof RegistrationDtoKind[keyof typeof RegistrationDtoKind];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RegistrationDtoKind = {
  HMO_LICENCE: 'HMO_LICENCE',
  SELECTIVE_LICENCE: 'SELECTIVE_LICENCE',
  PRS_DATABASE: 'PRS_DATABASE',
  RENT_SMART_WALES: 'RENT_SMART_WALES',
  LANDLORD_REGISTRATION_SCOTLAND: 'LANDLORD_REGISTRATION_SCOTLAND',
  LANDLORD_REGISTRATION_NI: 'LANDLORD_REGISTRATION_NI',
  OTHER: 'OTHER',
} as const;
