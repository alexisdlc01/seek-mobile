/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Set when the contract is Seek's built-in agreement.
 * @nullable
 */
export type ContractTemplateKind = typeof ContractTemplateKind[keyof typeof ContractTemplateKind] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContractTemplateKind = {
  ENGLAND_ASSURED_PERIODIC: 'ENGLAND_ASSURED_PERIODIC',
  WALES_STANDARD_OCCUPATION: 'WALES_STANDARD_OCCUPATION',
} as const;
