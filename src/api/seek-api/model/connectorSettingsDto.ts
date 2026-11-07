/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ConnectorSettingsDtoScope } from './connectorSettingsDtoScope';

export interface ConnectorSettingsDto {
  /** Connected mailboxes only ever import housing-related emails. */
  scope: ConnectorSettingsDtoScope;
  /** File leases, certificates and bills found in attachments automatically. */
  autoFileAttachments: boolean;
  /** Students: add landlord and character references found in emails to the Seek Passport. */
  addReferencesToProfile: boolean;
  /** Read utility bills from emails so they can be split. */
  readUtilityBills: boolean;
  /** File signed tenancy agreements in the tenancy, where every tenant sees them. */
  copySignedContracts: boolean;
  /** Let Seek AI suggest replies in the inbox (the user always presses send). */
  aiDraftReplies: boolean;
}
