import { Gender, Role } from '@/common/enums';

const GENDER = `${Object.values(Gender)
  .filter((gender) => isNaN(Number(gender)))
  .join('|')}`;

const ROLE = `${Object.values(Role)
  .filter((role) => isNaN(Number(role)))
  .join('|')}`;

const BOD = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i;

export default {
  BOD,
  ROLE,
  GENDER,
};
