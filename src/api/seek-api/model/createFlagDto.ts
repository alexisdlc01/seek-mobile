/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CreateFlagDtoCategory } from './createFlagDtoCategory';

export interface CreateFlagDto {
  /** @maxLength 5000 */
  text: string;
  category: CreateFlagDtoCategory;
  reportedUser: string;
}
