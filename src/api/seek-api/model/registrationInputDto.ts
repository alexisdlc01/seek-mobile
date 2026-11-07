/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RegistrationInputDtoKind } from './registrationInputDtoKind';

export interface RegistrationInputDto {
  kind: RegistrationInputDtoKind;
  number: string;
}
