/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface SearchFiltersDto {
  city?: string;
  /** Monthly rent per person, in pounds. */
  maxRent?: number;
  minBedrooms?: number;
  billsIncluded?: boolean;
  nearUniversity?: string;
  /** YYYY-MM-DD */
  moveIn?: string;
  /** Neighbourhood matched against the listing text. */
  area?: string;
}
