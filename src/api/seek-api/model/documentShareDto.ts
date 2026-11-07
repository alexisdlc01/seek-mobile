/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ShareViewerDto } from './shareViewerDto';
import type { DocumentShareDtoListing } from './documentShareDtoListing';

export interface DocumentShareDto {
  _id: string;
  viewer: ShareViewerDto;
  /** @nullable */
  listing: DocumentShareDtoListing;
  /** @nullable */
  application: string | null;
  expiresAt: string;
  /** @nullable */
  revokedAt: string | null;
  /** Not revoked and not yet expired. */
  active: boolean;
}
