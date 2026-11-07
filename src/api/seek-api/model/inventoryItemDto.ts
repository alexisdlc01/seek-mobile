/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface InventoryItemDto {
  room: string;
  item: string;
  condition: string;
  photoUrls?: string[];
}
