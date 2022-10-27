import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsPhoneNumber } from 'class-validator';

import { Gender, Role } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';
import { IsOnlyDate, IsValidGender, IsValidRole } from '@/decorators';

export class RegisteredDto extends ActionedBaseDto {
  @IsValidRole()
  @ApiProperty({ enum: () => Role })
  role: Role;

  @IsEmail()
  @ApiProperty({ format: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
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
  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @IsPhoneNumber('VN')
  @ApiProperty({ example: '0123456789' })
  phoneNumber: string;
}
