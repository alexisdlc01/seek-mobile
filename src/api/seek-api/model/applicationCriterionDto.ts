/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ApplicationCriterionDtoKey } from './applicationCriterionDtoKey';

export interface ApplicationCriterionDto {
  key: ApplicationCriterionDtoKey;
  label: string;
  passed: boolean;
  detail: string;
}
