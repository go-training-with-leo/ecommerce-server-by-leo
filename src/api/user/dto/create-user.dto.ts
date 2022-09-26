import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender, Role } from '@/common/enums';
import { IsOnlyDate, IsValidGender, IsValidRole } from '@/decorators';

export class CreateUserDto {
  @IsNotEmpty()
  @IsValidRole()
  @ApiProperty({
    enum: Role,
    default: Role[Role.USER],
  })
  role?: Role;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ format: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    format: 'password',
    example: 'P@ssw0rd',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  lastName: string;

  @IsOptional()
  @IsValidGender()
  @ApiProperty({
    enum: Gender,
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
  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber: string;
}
