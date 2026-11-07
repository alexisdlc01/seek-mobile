/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UploadControllerGetPresignedUrlFileType } from './uploadControllerGetPresignedUrlFileType';
import type { UploadControllerGetPresignedUrlFolder } from './uploadControllerGetPresignedUrlFolder';

export type UploadControllerGetPresignedUrlParams = {
fileType: UploadControllerGetPresignedUrlFileType;
folder: UploadControllerGetPresignedUrlFolder;
/**
 * Original filename. Informational only — the stored object key is generated server-side.
 */
filename: string;
/**
 * Exact size of the file in bytes. Must be at most 15728640.
 * @maximum 15728640
 */
fileSize: number;
};
