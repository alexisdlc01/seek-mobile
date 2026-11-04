/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingsControllerGetFilteredListingsPropertyType } from './listingsControllerGetFilteredListingsPropertyType';

export type ListingsControllerGetFilteredListingsParams = {
propertyType: ListingsControllerGetFilteredListingsPropertyType;
numOfPeople: number;
monthlyRentMin: number;
monthlyRentMax: number;
sizeSqMeters: number;
amenities: string[];
lat: number;
lng: number;
radius?: number;
page?: number;
limit?: number;
};
