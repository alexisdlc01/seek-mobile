/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ViewingSlotAvailability {
  at: string;
  /** Households that can still book this time (capacity minus open bookings). */
  remaining: number;
}
