/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InventoryItemDto } from './inventoryItemDto';

export interface InventoryDto {
  items: InventoryItemDto[];
}
