import { Env } from '@/utils/constants';

import { Role } from '@/common/enums';

import type { User } from '@/api/user/entities';

import hash from './hash';
import enumh from './enumh';
import entity from './entity';

const getEnv = (): string => process.env.NODE_ENV || Env.DEVELOPMENT;

const isDevelopmentEnv = (): boolean =>
  getEnv() !== Env.PRODUCTION || getEnv() !== Env.STAGING;

const isAdmin = (user: User): boolean => user?.role === Role.ADMIN;

export { getEnv, isAdmin, isDevelopmentEnv, hash, enumh, entity };
