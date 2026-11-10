/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RentPlan } from './rentPlan';
import type { RentPlanViewDtoAllowedFrequenciesItem } from './rentPlanViewDtoAllowedFrequenciesItem';
import type { RentPlanViewDtoMode } from './rentPlanViewDtoMode';
import type { StudentPaymentDto } from './studentPaymentDto';

export interface RentPlanViewDto {
  /** False until the tenant saves a plan; plan then holds the defaults. */
  exists: boolean;
  plan: RentPlan;
  /** Rent per tenant per month, in pence. */
  monthlyRent: number;
  nation: string;
  /** England: MONTHLY only. */
  allowedFrequencies: RentPlanViewDtoAllowedFrequenciesItem[];
  /**
   * Why other frequencies are not offered.
   * @nullable
   */
  restrictionReason: string | null;
  mode: RentPlanViewDtoMode;
  /** True once a card is saved for autopay (Stripe charges it off-session). */
  autopayCardSaved: boolean;
  /** Next payments due (up to 3). */
  upcoming: StudentPaymentDto[];
}
