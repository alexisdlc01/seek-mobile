/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingNation = typeof ListingNation[keyof typeof ListingNation];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingNation = {
  ENGLAND: 'ENGLAND',
  WALES: 'WALES',
  SCOTLAND: 'SCOTLAND',
  NORTHERN_IRELAND: 'NORTHERN_IRELAND',
} as const;
