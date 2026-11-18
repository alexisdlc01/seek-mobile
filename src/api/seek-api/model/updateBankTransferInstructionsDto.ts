/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface UpdateBankTransferInstructionsDto {
  /**
   * Instructions for paying this tenancy by bank transfer.
   * @maxLength 1000
   */
  bankTransferInstructions: string;
}
