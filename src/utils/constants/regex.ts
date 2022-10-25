import { enumh } from '@/utils/helpers';
import { Gender, Role, Size } from '@/common/enums';

const GENDER = enumh?.convertToRegex<typeof Gender>(Gender);

const ROLE = enumh?.convertToRegex<typeof Role>(Role);

const BOD = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i;

const SIZE = enumh?.convertToRegex<typeof Size>(Size);

export default {
  BOD,
  ROLE,
  SIZE,
  GENDER,
};
