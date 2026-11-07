/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { AddTenancyDocumentDtoType } from './addTenancyDocumentDtoType';
import type { AddTenancyDocumentDtoSource } from './addTenancyDocumentDtoSource';

export interface AddTenancyDocumentDto {
  type: AddTenancyDocumentDtoType;
  title: string;
  url: string;
  /** Private upload key from /upload/presign. */
  key?: string;
  source?: AddTenancyDocumentDtoSource;
}
