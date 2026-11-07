/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { TenancyDocumentType } from './tenancyDocumentType';
import type { TenancyDocumentSource } from './tenancyDocumentSource';

export interface TenancyDocument {
  _id: string;
  type: TenancyDocumentType;
  title: string;
  url: string;
  key?: string;
  source: TenancyDocumentSource;
  addedAt: string;
}
