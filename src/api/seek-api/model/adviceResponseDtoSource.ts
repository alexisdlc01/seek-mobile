/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type AdviceResponseDtoSource = typeof AdviceResponseDtoSource[keyof typeof AdviceResponseDtoSource];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AdviceResponseDtoSource = {
  ai: 'ai',
  rules: 'rules',
} as const;
