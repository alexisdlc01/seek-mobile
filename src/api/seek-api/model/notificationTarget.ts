/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Typed destination: a logical `screen` plus the `id` it is about. Clients route on `screen`;
`link` is the seek-web path and `mobile` the seek-mobile path (students only).

| kind | student screen → web / mobile | landlord screen → web |
|---|---|---|
| PAYMENTS | rent → /student/home/rent / /(app)/(tabs)/rent | landlord-rent → /rent |
| COMPLIANCE | deposit → /student/home/deposit / /(app)/deposit | dashboard → /dashboard |
| TENANCY | home → /student/home / /(app)/(tabs)/my-home | contracts → /contracts |
| CONTRACTS | contract → /student/home / /(app)/contract | contracts → /contracts |
| REPAIRS | repairs → /student/home / /(app)/repairs | dashboard → /dashboard |
| APPLICATION | applications → /student/home / /(app)/(tabs)/applied | application → /application?listing=<listing>&id=<id> (or /applicants) |
 */
export type NotificationTarget = { [key: string]: unknown };
