/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface RemindLateResponseDto {
  /** Tenants reminded just now. */
  reminded: number;
  /** Late payments skipped because the tenant was already reminded in the last 24 hours. */
  skipped: number;
}
