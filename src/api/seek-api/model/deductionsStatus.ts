/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * ACCEPTED once every tenant agrees; DISPUTED as soon as one disagrees.
 */
export type DeductionsStatus = typeof DeductionsStatus[keyof typeof DeductionsStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DeductionsStatus = {
  PROPOSED: 'PROPOSED',
  ACCEPTED: 'ACCEPTED',
  DISPUTED: 'DISPUTED',
} as const;
