/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { AddDocumentDtoDocumentType } from './addDocumentDtoDocumentType';

export interface AddDocumentDto {
  documentType: AddDocumentDtoDocumentType;
  url: string;
  /** Object key returned by /upload/presign. Must have been issued to the calling account. */
  key: string;
  /** Shown in the passport, e.g. file name or share code. */
  label?: string;
  expiresAt?: string;
}
