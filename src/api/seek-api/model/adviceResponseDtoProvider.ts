/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type AdviceResponseDtoProvider = typeof AdviceResponseDtoProvider[keyof typeof AdviceResponseDtoProvider];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AdviceResponseDtoProvider = {
  gemini: 'gemini',
  anthropic: 'anthropic',
  rules: 'rules',
} as const;
