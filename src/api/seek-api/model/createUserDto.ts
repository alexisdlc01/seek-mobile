/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CreateUserDtoRole } from './createUserDtoRole';

export interface CreateUserDto {
  name: string;
  email: string;
  role?: CreateUserDtoRole;
  imageUrl: string;
  password: string;
}
