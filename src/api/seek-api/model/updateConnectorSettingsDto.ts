/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UpdateConnectorSettingsDtoScope } from './updateConnectorSettingsDtoScope';

export interface UpdateConnectorSettingsDto {
  scope?: UpdateConnectorSettingsDtoScope;
  autoFileAttachments?: boolean;
  addReferencesToProfile?: boolean;
  readUtilityBills?: boolean;
  copySignedContracts?: boolean;
  aiDraftReplies?: boolean;
}
