/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingCriteriaGuarantor } from './listingCriteriaGuarantor';

export interface ListingCriteria {
  guarantor: ListingCriteriaGuarantor;
  /** Applicants must upload a landlord, agent or character reference. */
  referencesRequired: boolean;
  /** Largest household the landlord will accept. */
  maxHousehold?: number;
}
