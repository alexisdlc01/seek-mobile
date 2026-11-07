/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingSearchResultDtoNation = typeof ListingSearchResultDtoNation[keyof typeof ListingSearchResultDtoNation];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingSearchResultDtoNation = {
  ENGLAND: 'ENGLAND',
  WALES: 'WALES',
  SCOTLAND: 'SCOTLAND',
  NORTHERN_IRELAND: 'NORTHERN_IRELAND',
} as const;
