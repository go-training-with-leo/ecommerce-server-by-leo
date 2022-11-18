import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsPhoneNumber } from 'class-validator';

import { Gender, Role } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';
import { IsOnlyDate, IsValidGender, IsValidRole } from '@/decorators';
import { GotAddressDto } from '@/api/address/dto/got-address.dto';
import { GotInvoiceDto } from '@/api/invoice/dto';

class GotUserSessionDto extends ActionedBaseDto {}

export class GotUserDto extends ActionedBaseDto {
  @IsValidRole()
  @ApiProperty({
    enum: Role,
  })
  role?: Role;

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

export class GotUserDetailDto extends GotUserDto {
  @ApiProperty({ isArray: true })
  addresses: GotAddressDto;

  @ApiProperty({ isArray: true })
  sessions: GotUserSessionDto;

  @ApiProperty({ isArray: true })
  invoices: GotInvoiceDto;
}
