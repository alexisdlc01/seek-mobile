/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface UniversityDetailsDto {
  /** What the student wrote on their profile. */
  text: string;
  course?: string;
  university?: string;
  /** 1-4, or Final. */
  year?: string;
}
