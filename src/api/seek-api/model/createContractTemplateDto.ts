/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface CreateContractTemplateDto {
  title: string;
  url: string;
  /** Private upload key from /upload/presign. */
  key?: string;
}
