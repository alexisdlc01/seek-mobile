/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingSearchResultDtoFurnishingStatus = typeof ListingSearchResultDtoFurnishingStatus[keyof typeof ListingSearchResultDtoFurnishingStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingSearchResultDtoFurnishingStatus = {
  Furnished: 'Furnished',
  Unfurnished: 'Unfurnished',
  'Part-Furnished': 'Part-Furnished',
} as const;
