/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { NotificationKind } from './notificationKind';
import type { NotificationTarget } from './notificationTarget';

export interface Notification {
  _id: string;
  user: string;
  kind: NotificationKind;
  title: string;
  body?: string;
  /** seek-web path to open, e.g. /student/home/rent. Same route as `target`. */
  link?: string;
  /** Typed destination: a logical `screen` plus the `id` it is about. Clients route on `screen`;
`link` is the seek-web path and `mobile` the seek-mobile path (students only).

| kind | student screen → web / mobile | landlord screen → web |
|---|---|---|
| PAYMENTS | rent → /student/home/rent / /(app)/(tabs)/rent | landlord-rent → /rent |
| COMPLIANCE | deposit → /student/home/deposit / /(app)/deposit | dashboard → /dashboard |
| TENANCY | home → /student/home / /(app)/(tabs)/my-home | contracts → /contracts |
| CONTRACTS | contract → /student/home / /(app)/contract | contracts → /contracts |
| REPAIRS | repairs → /student/home / /(app)/repairs | dashboard → /dashboard |
| APPLICATION | applications → /student/home / /(app)/(tabs)/applied | application → /application?listing=<listing>&id=<id> (or /applicants) | */
  target?: NotificationTarget;
  /** @nullable */
  readAt: string | null;
  createdAt: string;
}
