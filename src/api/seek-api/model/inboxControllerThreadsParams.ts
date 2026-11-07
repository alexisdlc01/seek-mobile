/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { InboxControllerThreadsCategory } from './inboxControllerThreadsCategory';

export type InboxControllerThreadsParams = {
/**
 * Only threads in this category.
 */
category?: InboxControllerThreadsCategory;
};
