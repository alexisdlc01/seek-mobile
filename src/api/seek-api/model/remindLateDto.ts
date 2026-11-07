/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface RemindLateDto {
  /** Only these late payments. Omit to remind every late tenant. */
  payments?: string[];
}
