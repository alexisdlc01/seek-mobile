/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface CreateRepairDto {
  tenancy: string;
  title: string;
  description?: string;
}
