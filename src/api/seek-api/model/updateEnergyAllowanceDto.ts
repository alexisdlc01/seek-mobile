/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface UpdateEnergyAllowanceDto {
  /**
   * Energy fair-use allowance for the household, in pence per month. null removes it.
   * @nullable
   */
  energyAllowance: number | null;
}
