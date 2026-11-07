/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { MatchedContactDtoCategory } from './matchedContactDtoCategory';

export interface MatchedContactDto {
  name: string;
  email: string;
  category: MatchedContactDtoCategory;
  emailCount: number;
}
