/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PassportSectionDtoKey } from './passportSectionDtoKey';
import type { PassportItemDto } from './passportItemDto';

export interface PassportSectionDto {
  key: PassportSectionDtoKey;
  label: string;
  items: PassportItemDto[];
}
