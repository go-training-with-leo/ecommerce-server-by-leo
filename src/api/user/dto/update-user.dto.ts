import {
  IsString,
  MinLength,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { Gender } from '@/common/enums';
import { IsOnlyDate, IsValidGender } from '@/decorators';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  @ApiPropertyOptional({
    format: 'password',
    required: false,
  })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsValidGender()
  @ApiPropertyOptional({
    enum: Gender,
  })
  gender?: Gender;

  @IsOptional()
  @IsOnlyDate()
  @ApiPropertyOptional({
    format: 'date',
  })
  bod?: Date;

  @IsOptional()
  @IsPhoneNumber('VN')
  @ApiPropertyOptional()
  phoneNumber?: string;
}
