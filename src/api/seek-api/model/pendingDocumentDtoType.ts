/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PendingDocumentDtoType = typeof PendingDocumentDtoType[keyof typeof PendingDocumentDtoType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PendingDocumentDtoType = {
  IDENTIFICATION: 'IDENTIFICATION',
  PROOF_OF_INCOME: 'PROOF_OF_INCOME',
  GUARANTOR_AGREEMENT: 'GUARANTOR_AGREEMENT',
  LANDLORD_REFERENCE: 'LANDLORD_REFERENCE',
  CHARACTER_REFERENCE: 'CHARACTER_REFERENCE',
  PASSPORT: 'PASSPORT',
  VISA: 'VISA',
  RIGHT_TO_RENT: 'RIGHT_TO_RENT',
  STUDENT_STATUS: 'STUDENT_STATUS',
  CAS_LETTER: 'CAS_LETTER',
  PROOF_OF_FUNDS: 'PROOF_OF_FUNDS',
  AGENT_REFERENCE: 'AGENT_REFERENCE',
  RECOMMENDATION: 'RECOMMENDATION',
} as const;
