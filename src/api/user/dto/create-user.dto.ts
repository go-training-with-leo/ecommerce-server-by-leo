import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { Gender, Role } from '@/common/enums';
import { IsOnlyDate, IsValidGender, IsValidRole } from '@/decorators';

export class CreateUserDto {
  @IsNotEmpty()
  @IsValidRole()
  @ApiProperty({
    enum: Role,
    default: Role[enumh?.getFirstValue<typeof Role>(Role)],
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

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber: string;
}
