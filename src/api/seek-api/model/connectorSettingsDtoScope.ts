/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Connected mailboxes only ever import housing-related emails.
 */
export type ConnectorSettingsDtoScope = typeof ConnectorSettingsDtoScope[keyof typeof ConnectorSettingsDtoScope];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConnectorSettingsDtoScope = {
  housing: 'housing',
} as const;
