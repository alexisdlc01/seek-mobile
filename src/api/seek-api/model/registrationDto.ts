/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RegistrationDtoKind } from './registrationDtoKind';

export interface RegistrationDto {
  kind: RegistrationDtoKind;
  number: string;
  verified: boolean;
}
