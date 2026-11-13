/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { FlagStatus } from './flagStatus';
import type { FlagCategory } from './flagCategory';
import type { FlagTriage } from './flagTriage';

export interface Flag {
  _id: string;
  status: FlagStatus;
  category: FlagCategory;
  reportedUser: string;
  createdBy: string;
  text: string;
  resolutionDate?: string;
  /**
   * Seek support's reply to the reporter.
   * @nullable
   */
  supportResponse?: string | null;
  /**
   * Automatic AI triage (admins only): category, severity and a short summary.
   * @nullable
   */
  triage?: FlagTriage;
  createdAt: string;
}
