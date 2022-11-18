import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsPostalCode,
  IsPhoneNumber,
  IsUUID,
} from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

import { GotUserDto } from '@/api/user/dto';

export class GotInvoiceDto extends ActionedBaseDto {
  @IsEmail()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  street: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  city: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  country: string;

  @IsPostalCode()
  @ApiProperty({ example: '70000' })
  postalCode: string;

  @IsPhoneNumber('VN')
  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  discountCode?: string;
}

export class GotInvoiceDetailDto extends GotInvoiceDto {
  @ApiProperty({ type: () => GotUserDto })
  createdBy: GotUserDto;
}
