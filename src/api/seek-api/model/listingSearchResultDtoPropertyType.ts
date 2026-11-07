/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingSearchResultDtoPropertyType = typeof ListingSearchResultDtoPropertyType[keyof typeof ListingSearchResultDtoPropertyType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingSearchResultDtoPropertyType = {
  FLAT_APARTMENT: 'FLAT_APARTMENT',
  HOUSE: 'HOUSE',
  ROOM_IN_SHARED_HOUSE: 'ROOM_IN_SHARED_HOUSE',
  STUDIO: 'STUDIO',
  OTHER: 'OTHER',
} as const;
