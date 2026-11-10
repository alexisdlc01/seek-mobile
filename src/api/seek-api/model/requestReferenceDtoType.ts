/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * GUARANTOR_AGREEMENT invites a UK guarantor; the others ask a previous landlord, letting agent or academic for a reference.
 */
export type RequestReferenceDtoType = typeof RequestReferenceDtoType[keyof typeof RequestReferenceDtoType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RequestReferenceDtoType = {
  GUARANTOR_AGREEMENT: 'GUARANTOR_AGREEMENT',
  LANDLORD_REFERENCE: 'LANDLORD_REFERENCE',
  AGENT_REFERENCE: 'AGENT_REFERENCE',
  RECOMMENDATION: 'RECOMMENDATION',
} as const;
