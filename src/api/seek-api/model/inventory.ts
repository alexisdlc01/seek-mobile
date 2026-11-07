/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InventoryItem } from './inventoryItem';

export interface Inventory {
  items: InventoryItem[];
  recordedAt: string;
}
