/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type TenancyDocumentType = typeof TenancyDocumentType[keyof typeof TenancyDocumentType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TenancyDocumentType = {
  TENANCY_AGREEMENT: 'TENANCY_AGREEMENT',
  DEPOSIT_CERTIFICATE: 'DEPOSIT_CERTIFICATE',
  GAS_SAFETY: 'GAS_SAFETY',
  EPC: 'EPC',
  EICR: 'EICR',
  INVENTORY: 'INVENTORY',
  COUNCIL_TAX_EXEMPTION: 'COUNCIL_TAX_EXEMPTION',
  HOW_TO_RENT: 'HOW_TO_RENT',
  OTHER: 'OTHER',
} as const;
