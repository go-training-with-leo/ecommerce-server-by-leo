import type { Role } from '@/common/enums';

export interface IValidateUserParams {
  email: string;
  password: string;
}

export interface ITokenPayload {
  email: string;
  role: Role;
}
