/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Where the item came from. Student status can come from a confirmed university email; "request" means Seek emailed a guarantor or referee and is waiting on their reply (status PENDING).
 * @nullable
 */
export type PassportItemDtoSource = typeof PassportItemDtoSource[keyof typeof PassportItemDtoSource] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PassportItemDtoSource = {
  document: 'document',
  university_email: 'university email',
  request: 'request',
} as const;
