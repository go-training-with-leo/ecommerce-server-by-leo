import { Env } from '@/utils/constants';

import hash from './hash';

const getEnv = () => process.env.NODE_ENV || Env.DEVELOPMENT;

const isDevelopmentEnv = () => getEnv() !== Env.PRODUCTION;

export { getEnv, isDevelopmentEnv, hash };
