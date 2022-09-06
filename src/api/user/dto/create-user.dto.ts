import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsOnlyDate, IsValidGender } from '@/common/decorators';
import { Gender } from '@/common/enums';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ format: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    format: 'password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsValidGender()
  @ApiProperty({
    enum: Gender,
    default: Gender.MALE,
    required: false,
  })
  gender?: Gender;

  @IsOptional()
  @IsOnlyDate()
  @IsNotEmpty()
  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @ApiProperty()
  phoneNumber: string;
}
