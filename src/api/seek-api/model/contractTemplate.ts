/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ContractTemplate {
  _id: string;
  landlord: string;
  title: string;
  url: string;
  /** Private upload key from /upload/presign. */
  key?: string;
  createdAt: string;
}
