/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Role of the uploader, used to distinguish tenant evidence from landlord documents.
 */
export type TenancyDocumentUploaderRole = typeof TenancyDocumentUploaderRole[keyof typeof TenancyDocumentUploaderRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TenancyDocumentUploaderRole = {
  SUPERUSER: 'SUPERUSER',
  STUDENT: 'STUDENT',
  LANDLORD_AGENCY: 'LANDLORD_AGENCY',
} as const;
