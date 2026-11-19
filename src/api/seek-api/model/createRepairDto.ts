/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface CreateRepairDto {
  tenancy: string;
  title: string;
  description?: string;
  /** Private upload keys from /upload/presign (max 5 photos). */
  photoKeys?: string[];
}
