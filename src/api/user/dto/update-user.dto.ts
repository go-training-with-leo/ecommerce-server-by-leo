import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender } from '@/common/enums';
import { IsOnlyDate, IsValidGender } from '@/decorators';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    format: 'password',
    required: false,
  })
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false, example: 'Lorem' })
  firstName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false, example: 'Lorem' })
  lastName: string;

  @IsOptional()
  @IsValidGender()
  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @IsOptional()
  @IsNotEmpty()
  @IsOnlyDate()
  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('VN')
  @ApiProperty({ required: false, example: '0123456789' })
  phoneNumber: string;
}
