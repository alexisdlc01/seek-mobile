/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { Step4ItemDto } from './step4ItemDto';
import type { ListingCriteriaDto } from './listingCriteriaDto';

export interface Step4ListingDto {
  requirements: Step4ItemDto[];
  criteria?: ListingCriteriaDto;
}
