import { Matches } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

import { Regex } from '@/utils/constants';

export function IsOnlyDate() {
  return applyDecorators(
    Matches(Regex.BOD, {
      message: '$property must be formatted as yyyy-mm-dd.',
    }),
  );
}

export function IsValidGender() {
  return applyDecorators(
    Matches(Regex.GENDER, 'i', {
      message: '$property must match MALE|FEMALE|OTHER.',
    }),
  );
}
