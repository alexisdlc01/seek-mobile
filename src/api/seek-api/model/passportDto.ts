/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PassportDtoMissingRequiredItem } from './passportDtoMissingRequiredItem';
import type { PassportSectionDto } from './passportSectionDto';

export interface PassportDto {
  /** Every required item is verified. */
  ready: boolean;
  /** Number of passport items. */
  total: number;
  /** Number of verified items. */
  completed: number;
  /** completed / total, 0-100. */
  percent: number;
  missingRequired: PassportDtoMissingRequiredItem[];
  sections: PassportSectionDto[];
}
