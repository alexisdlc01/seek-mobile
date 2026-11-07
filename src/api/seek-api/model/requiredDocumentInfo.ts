/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RequiredDocumentInfoTypesItem } from './requiredDocumentInfoTypesItem';

export interface RequiredDocumentInfo {
  label: string;
  /** Any one of these Seek Passport types satisfies it. */
  types: RequiredDocumentInfoTypesItem[];
}
