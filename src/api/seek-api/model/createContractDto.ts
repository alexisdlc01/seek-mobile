/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CreateContractDtoSource } from './createContractDtoSource';

export interface CreateContractDto {
  tenancy: string;
  title: string;
  url: string;
  /** Private upload key from /upload/presign. */
  key?: string;
  source?: CreateContractDtoSource;
}
