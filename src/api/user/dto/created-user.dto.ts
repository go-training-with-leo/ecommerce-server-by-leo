import { IsEmail, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender, Role } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';
import { IsOnlyDate, IsValidGender, IsValidRole } from '@/decorators';

export class CreatedUserDto extends ActionedBaseDto {
  @IsValidRole()
  @ApiProperty({
    enum: Role,
  })
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

  @IsValidGender()
  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

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
