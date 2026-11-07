/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingsControllerGetFilteredListingsPropertyType } from './listingsControllerGetFilteredListingsPropertyType';

export type ListingsControllerGetFilteredListingsParams = {
propertyType?: ListingsControllerGetFilteredListingsPropertyType;
numOfPeople?: number;
monthlyRentMin?: number;
monthlyRentMax?: number;
sizeSqMeters?: number;
amenities?: string[];
lat?: number;
lng?: number;
radius?: number;
/**
 * 1-based page; needs limit
 * @minimum 1
 */
page?: number;
/**
 * @minimum 1
 * @maximum 50
 */
limit?: number;
/**
 * Bounding box south edge (map viewport).
 */
minLat?: number;
/**
 * Bounding box north edge (map viewport).
 */
maxLat?: number;
/**
 * Bounding box west edge (map viewport).
 */
minLng?: number;
/**
 * Bounding box east edge (map viewport).
 */
maxLng?: number;
/**
 * Maximum monthly rent per person, in pounds.
 */
maxRent?: number;
/**
 * @minimum 0
 */
minBedrooms?: number;
billsIncluded?: boolean;
/**
 * City or town, case-insensitive.
 */
city?: string;
/**
 * Free text matched against title, description and address.
 */
text?: string;
};
