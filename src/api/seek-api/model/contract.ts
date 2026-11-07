/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ContractSource } from './contractSource';
import type { ContractStatus } from './contractStatus';
import type { ContractSignature } from './contractSignature';
import type { ContractTemplateKind } from './contractTemplateKind';
import type { ContractInventory } from './contractInventory';
import type { ContractDeductions } from './contractDeductions';

export interface Contract {
  _id: string;
  tenancy: string;
  landlord: string;
  title: string;
  url: string;
  key?: string;
  source: ContractSource;
  status: ContractStatus;
  signatures: ContractSignature[];
  /** @nullable */
  sentAt: string | null;
  /** @nullable */
  signedAt: string | null;
  /**
   * Set when the contract is Seek's built-in agreement.
   * @nullable
   */
  templateKind: ContractTemplateKind;
  /**
   * The deposit's prescribed information (HTML), for Seek agreements.
   * @nullable
   */
  prescribedInformationUrl: string | null;
  /**
   * Check-in inventory.
   * @nullable
   */
  inventory: ContractInventory;
  /**
   * Proposed end-of-tenancy deductions.
   * @nullable
   */
  deductions: ContractDeductions;
}
