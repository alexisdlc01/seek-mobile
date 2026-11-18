/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { TenancyDocumentType } from './tenancyDocumentType';
import type { TenancyDocumentSource } from './tenancyDocumentSource';
import type { TenancyDocumentStage } from './tenancyDocumentStage';
import type { TenancyDocumentUploaderRole } from './tenancyDocumentUploaderRole';

export interface TenancyDocument {
  _id: string;
  type: TenancyDocumentType;
  title: string;
  url: string;
  key?: string;
  source: TenancyDocumentSource;
  stage?: TenancyDocumentStage;
  /** False when a tenancy agreement came from a tenant-controlled mailbox and has not been confirmed by the landlord. */
  confirmedByLandlord: boolean;
  /** Account that uploaded or imported the document. */
  uploadedBy?: string;
  /** Role of the uploader, used to distinguish tenant evidence from landlord documents. */
  uploaderRole?: TenancyDocumentUploaderRole;
  addedAt: string;
}
