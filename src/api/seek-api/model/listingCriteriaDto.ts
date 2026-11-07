/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingCriteriaDtoGuarantor } from './listingCriteriaDtoGuarantor';

export interface ListingCriteriaDto {
  guarantor?: ListingCriteriaDtoGuarantor;
  referencesRequired?: boolean;
  /**
   * @minimum 1
   * @maximum 20
   */
  maxHousehold?: number;
}
