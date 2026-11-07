/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { TeamOfDtoScopesItem } from './teamOfDtoScopesItem';

export interface TeamOfDto {
  ownerId: string;
  ownerName: string;
  /** Never includes payouts: payments endpoints answer 403. */
  scopes: TeamOfDtoScopesItem[];
}
