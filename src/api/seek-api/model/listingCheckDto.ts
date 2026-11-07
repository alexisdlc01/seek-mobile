/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingCheckDtoKind } from './listingCheckDtoKind';

export interface ListingCheckDto {
  kind: ListingCheckDtoKind;
  text: string;
}
