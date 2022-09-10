import { Env } from '@/utils/constants';

import hash from './hash';
import entity from './entity';

const getEnv = (): string => process.env.NODE_ENV || Env.DEVELOPMENT;

const isDevelopmentEnv = (): boolean => getEnv() !== Env.PRODUCTION;

const getKeyByValueInObject = ({
  data,
  value,
}: {
  data: Record<string, string | number>;
  value: string | number;
}): string =>
  Object.entries(data)
    .filter((elm) => isNaN(Number(elm[0])))
    .find((elm) => elm[1]?.toString() === value?.toString())?.[0];

export { getEnv, isDevelopmentEnv, getKeyByValueInObject, hash, entity };
