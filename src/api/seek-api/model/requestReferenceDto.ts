/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RequestReferenceDtoType } from './requestReferenceDtoType';

export interface RequestReferenceDto {
  /** GUARANTOR_AGREEMENT invites a UK guarantor; the others ask a previous landlord, letting agent or academic for a reference. */
  type: RequestReferenceDtoType;
  /** Guarantor or referee name. */
  name: string;
  email: string;
}
