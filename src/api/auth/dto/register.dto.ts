import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender } from '@/common/enums';
import { IsOnlyDate, IsValidGender } from '@/common/decorators';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsOnlyDate()
  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @IsOptional()
  @IsValidGender()
  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;
}
