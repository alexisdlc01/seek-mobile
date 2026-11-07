/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type CreateListingDtoNation = typeof CreateListingDtoNation[keyof typeof CreateListingDtoNation];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateListingDtoNation = {
  ENGLAND: 'ENGLAND',
  WALES: 'WALES',
  SCOTLAND: 'SCOTLAND',
  NORTHERN_IRELAND: 'NORTHERN_IRELAND',
} as const;
