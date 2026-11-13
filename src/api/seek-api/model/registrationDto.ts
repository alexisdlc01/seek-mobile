/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RegistrationDtoKind } from './registrationDtoKind';
import type { RegistrationDtoStatus } from './registrationDtoStatus';

export interface RegistrationDto {
  kind: RegistrationDtoKind;
  number: string;
  /** Always false: Seek does not check numbers against the registers. Use status. */
  verified: boolean;
  /** Format check only: DECLARED or INVALID_FORMAT. */
  status: RegistrationDtoStatus;
}
