/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { DeductionItemDto } from './deductionItemDto';

export interface DeductionsDto {
  /** An empty list proposes returning the whole deposit. */
  items: DeductionItemDto[];
}
