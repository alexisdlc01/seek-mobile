/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RepairStatus } from './repairStatus';

export interface Repair {
  _id: string;
  tenancy: string;
  landlord: string;
  reportedBy: string;
  title: string;
  description?: string;
  status: RepairStatus;
  /** @nullable */
  scheduledFor: string | null;
  /** @nullable */
  fixedAt: string | null;
  createdAt: string;
}
