/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ConnectorsControllerAuthUrlClient } from './connectorsControllerAuthUrlClient';

export type ConnectorsControllerAuthUrlParams = {
/**
 * Where to send the user back after consent.
 */
client?: ConnectorsControllerAuthUrlClient;
/**
 * Web path to return to (must start with /).
 */
returnTo?: string;
};
